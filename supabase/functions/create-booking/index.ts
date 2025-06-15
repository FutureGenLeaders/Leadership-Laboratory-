
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error("Invalid user token");
    }

    // Parse request body
    const { sessionType, sessionDate, sessionTime, notes } = await req.json();

    // Validate required fields
    if (!sessionType || !sessionDate || !sessionTime) {
      throw new Error("Missing required fields: sessionType, sessionDate, sessionTime");
    }

    // Check for existing booking conflicts
    const { data: existingBookings, error: checkError } = await supabaseClient
      .from("bookings")
      .select("*")
      .eq("session_date", sessionDate)
      .eq("session_time", sessionTime)
      .neq("status", "cancelled");

    if (checkError) {
      throw new Error(`Error checking existing bookings: ${checkError.message}`);
    }

    if (existingBookings && existingBookings.length > 0) {
      throw new Error("This time slot is already booked");
    }

    // Create the booking
    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .insert({
        user_id: user.id,
        session_type: sessionType,
        session_date: sessionDate,
        session_time: sessionTime,
        notes: notes || null,
        status: "pending"
      })
      .select()
      .single();

    if (bookingError) {
      throw new Error(`Error creating booking: ${bookingError.message}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        booking,
        message: "Booking created successfully! You will receive a confirmation email shortly."
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Booking creation error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
