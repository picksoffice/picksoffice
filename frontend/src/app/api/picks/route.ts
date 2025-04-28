import { NextResponse } from 'next/server';
import { fetchAPI } from '@/lib/api';
import { StrapiResponse, Pick } from '@/lib/api';

export const dynamic = 'force-dynamic'; // Disable caching for this route

export async function GET(request: Request) {
  try {
    // Get the search params from the request URL
    const { searchParams } = new URL(request.url);
    
    // Convert searchParams to a standard object
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    console.log('API route /api/picks called with params:', params);
    
    // Build query string manually
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, value);
    });
    
    // Direct call to Strapi API
    const path = `/picks?${queryParams.toString()}`;
    console.log('Direct Strapi API call to path:', path);
    
    try {
      // If STRAPI_API_URL is not set, return empty response to prevent errors
      if (!process.env.NEXT_PUBLIC_STRAPI_API_URL) {
        console.error('NEXT_PUBLIC_STRAPI_API_URL not set');
        return NextResponse.json({ 
          data: [],
          meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } }
        });
      }
      
      // Add error handling for network issues
      const picksResponse = await fetchAPI<StrapiResponse<Pick>>(path, {}, '', true);
      
      // Check if the response is valid
      if (!picksResponse || !picksResponse.data) {
        console.error('Invalid response structure from Strapi API:', picksResponse);
        // Return an empty data array to prevent client-side errors
        return NextResponse.json({ 
          data: [],
          meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } }
        });
      }
      
      // Return the response
      return NextResponse.json(picksResponse);
    } catch (apiError: any) {
      console.error('Error calling Strapi API:', apiError);
      // Return a structured empty response instead of an error
      return NextResponse.json({ 
        data: [],
        meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } }
      }, { status: 200 }); // Ensure we return 200 status even on error
    }
  } catch (error) {
    console.error('Error in /api/picks route:', error);
    // Return a structured empty response instead of an error
    return NextResponse.json({ 
      data: [],
      meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } }
    }, { status: 200 }); // Ensure we return 200 status even on error
  }
}
