// src/lib/api.ts
export interface Pick {
  id: number;
  documentId: string;
  League: string;
  Date: string;
  Away: string;
  Home: string;
  Pick: string;
  Stake: number;
  Odds: number;
  Result: string;
  Summary: string;
  Writeup: string | null | any;
  Slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Author: string;
}

export interface StrapiResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiError {
  error?: {
    status?: number;
    name?: string;
    message?: string;
    details?: any;
  };
}

// API URLs and tokens for production environment
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
  queryParams: string = '',
  skipAuth: boolean = false
): Promise<any> {
  const url = `${STRAPI_API_URL}/api${endpoint}${queryParams ? `?${queryParams}` : ''}`;
  
  // Check if the endpoint should skip authentication (public endpoints)
  const isPublicEndpoint = endpoint.startsWith('/picks') || 
                         endpoint.startsWith('/blogs') || 
                         skipAuth;

  try {
    // Create headers object with just Content-Type
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Add any additional headers from options safely
    if (options.headers) {
      const customHeaders = options.headers as Record<string, string>;
      Object.keys(customHeaders).forEach(key => {
        headers[key] = customHeaders[key];
      });
    }
    
    // Only add Authorization header if token exists and endpoint needs auth
    if (STRAPI_API_TOKEN && !isPublicEndpoint) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    console.log(`Making request to: ${url}`, {
      method: options.method || 'GET',
      bodyLength: options.body ? (options.body as string).length : 0,
      hasToken: !!STRAPI_API_TOKEN,
    });

    // Add a timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout for faster failure
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
        cache: 'no-store',
        next: { revalidate: 0 },
      });
      
      clearTimeout(timeoutId);

      console.log(`Response status for ${endpoint}: ${response.status}, Status Text: ${response.statusText}`);

      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status} ${response.statusText}`;
        let errorData: StrapiError = {};
        try {
          const textContent = await response.text();
          console.error('API response error raw content:', textContent);
          
          if (textContent) {
            try {
              errorData = JSON.parse(textContent);
              console.error('API response error details (parsed):', errorData);
              errorMessage = errorData.error?.message || errorMessage;
            } catch (jsonError) {
              console.error('Error is not in JSON format:', jsonError);
              errorMessage = `${errorMessage} - Raw response: ${textContent.substring(0, 100)}...`;
            }
          }
        } catch (parseError) {
          console.error('Could not parse error response:', parseError);
        }
        throw new Error(`Failed to fetch ${endpoint}: ${errorMessage}`);
      }

      try {
        const data = await response.json();
        console.log(`Response data for ${endpoint}:`, data);
        return data;
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        throw new Error(`Invalid JSON response from ${endpoint}`);
      }
    } catch (fetchError) {
      // Handle connection issues like ECONNREFUSED when the server is down
      if (fetchError.message && (
          fetchError.message.includes('ECONNREFUSED') || 
          fetchError.message.includes('Failed to fetch') ||
          fetchError.message.includes('Network request failed'))) {
        console.error(`Server connection error (${endpoint}):`, fetchError.message);
        return { data: [] }; // Return empty data for connection issues
      }
      throw fetchError; // Re-throw other errors
    }
  } catch (error: any) {
    // Log the error for debugging
    console.error(`Error with API request to ${endpoint}:`, {
      name: error?.name,
      message: error?.message || 'Unknown error',
      stack: error?.stack,
      url,
    });
    
    // Handle timeout errors
    if (error?.name === 'AbortError') {
      console.error(`Request to ${endpoint} timed out`);
      return { data: [] };
    }
    
    // Handle all network errors gracefully
    if (error?.message && (
        error.message.includes('fetch failed') || 
        error.message.includes('ECONNREFUSED') ||
        error.message.includes('Failed to fetch') ||
        error.message.includes('Network request failed')
    )) {
      console.error('Network connection error:', error.message);
      return { data: [] };
    }
    
    // Return empty data for any unknown error to avoid application failure
    console.error('Returning empty response due to unknown error');
    return { data: [] };
  }
}

export async function getPickById(id: string): Promise<StrapiResponse<Pick>> {
  const query = `filters[documentId][$eq]=${encodeURIComponent(id)}&publicationState=live&populate=*`;
  try {
    const response = await fetchAPI<Pick>('/picks', {}, query, true); // Set skipAuth to true
    
    // Check if response contains data
    if (!response.data || !Array.isArray(response.data)) {
      console.error('Unexpected API response structure:', response);
      return { data: [] };
    }
    
    // Transform Strapi response to match Pick interface, handling both nested and flat structures
    const data = response.data.map((item: any) => {
      if (item.attributes) {
        return {
          ...item.attributes,
          id: item.id,
          documentId: item.attributes.documentId || item.id,
        };
      } else {
        return {
          ...item,
          id: item.id || Math.random(),
          documentId: item.documentId || item.id || String(Math.random()),
        };
      }
    });
    
    return { data };
  } catch (error) {
    console.error('Error fetching pick by ID:', error);
    return { data: [] };
  }
}

export async function getAllPicks(): Promise<StrapiResponse<Pick>> {
  try {
    // Statische Mock-Daten für den Fall, dass die API nicht erreichbar ist
    const mockData: Pick[] = [
      {
        id: 1,
        documentId: "1",
        League: "NBA",
        Date: "2024-04-25T20:00:00Z",
        Away: "Timberwolves",
        Home: "Nuggets",
        Pick: "Timberwolves +4.5",
        Stake: 2,
        Odds: 1.91,
        Result: "Win",
        Summary: "The Wolves are showing incredible defensive prowess in this series and should cover the spread again.",
        Writeup: "After a dominant performance in Game 1, the Timberwolves continue to impress with their defensive intensity. Anthony Edwards has been outstanding, and Rudy Gobert is controlling the paint. While Denver will make adjustments, Minnesota's defensive scheme is giving Jokić problems. Expect another close game with the Wolves covering the spread.",
        Slug: "timberwolves-nuggets-apr25",
        createdAt: "2024-04-24T12:00:00Z",
        updatedAt: "2024-04-26T10:00:00Z",
        publishedAt: "2024-04-24T14:00:00Z",
        Author: "PicksOffice"
      },
      {
        id: 2,
        documentId: "2",
        League: "MLB",
        Date: "2024-04-26T18:30:00Z",
        Away: "Cardinals",
        Home: "Mets",
        Pick: "Under 8.5",
        Stake: 1,
        Odds: 1.95,
        Result: "Loss",
        Summary: "Two strong starting pitchers should keep the run total low in this National League matchup.",
        Writeup: "Both teams are sending their aces to the mound today. The Cardinals' starter has been excellent with a 2.45 ERA over his last three starts, while the Mets' pitcher has been equally impressive with a WHIP under 1.00 this season. Weather conditions at Citi Field are favorable for pitchers, and both bullpens have been reliable. Expect a low-scoring affair with quality pitching dominating.",
        Slug: "cardinals-mets-apr26",
        createdAt: "2024-04-25T15:00:00Z",
        updatedAt: "2024-04-27T09:00:00Z",
        publishedAt: "2024-04-25T16:00:00Z",
        Author: "PicksOffice"
      },
      {
        id: 3,
        documentId: "3",
        League: "NHL",
        Date: "2024-04-27T23:00:00Z",
        Away: "Rangers",
        Home: "Hurricanes",
        Pick: "Rangers ML",
        Stake: 1.5,
        Odds: 2.10,
        Result: "Pending",
        Summary: "Rangers' strong road performance and goaltending advantage give them value as underdogs.",
        Writeup: "The Rangers have been excellent on the road this season and their goaltending has been stellar in the playoffs. Igor Shesterkin gives them a significant advantage between the pipes. The Hurricanes have home ice, but the Rangers' defensive structure and counterattacking ability make them dangerous underdogs. The value is with New York at plus money in what should be a tight, competitive game.",
        Slug: "rangers-hurricanes-apr27",
        createdAt: "2024-04-26T14:00:00Z",
        updatedAt: "2024-04-26T14:00:00Z",
        publishedAt: "2024-04-26T15:00:00Z",
        Author: "PicksOffice"
      },
      {
        id: 4,
        documentId: "4",
        League: "NBA",
        Date: "2024-04-28T19:00:00Z",
        Away: "Knicks",
        Home: "76ers",
        Pick: "Knicks +2.5",
        Stake: 2,
        Odds: 1.91,
        Result: "Pending",
        Summary: "The Knicks' physical defense and rebounding advantage should keep this game close throughout.",
        Writeup: "The Knicks have been dominating the glass in this series, which has been a key factor in their success. Jalen Brunson continues to score efficiently despite Philadelphia's defensive focus. Joel Embiid isn't at 100%, which limits the 76ers' ceiling. While Philadelphia will be desperate at home, New York's toughness and rebounding prowess should keep this game within the spread. Take the points with the Knicks.",
        Slug: "knicks-76ers-apr28",
        createdAt: "2024-04-27T12:00:00Z",
        updatedAt: "2024-04-27T12:00:00Z",
        publishedAt: "2024-04-27T13:00:00Z",
        Author: "PicksOffice"
      },
      {
        id: 5,
        documentId: "5",
        League: "NFL",
        Date: "2024-09-10T00:30:00Z",
        Away: "Bengals",
        Home: "Chiefs",
        Pick: "Bengals +3.5",
        Stake: 1,
        Odds: 1.91,
        Result: "Pending",
        Summary: "Early season matchup between AFC contenders should be closely contested.",
        Writeup: "This AFC Championship rematch features two of the conference's elite quarterbacks. The Chiefs have home field advantage, but the Bengals have historically played them tough, with Joe Burrow having an excellent record against Kansas City. Cincinnati's improved offensive line and defensive additions make them dangerous underdogs. While the Chiefs are rightfully favored at home, the 3.5 points provides value with the Bengals who should keep this within a field goal.",
        Slug: "bengals-chiefs-sep10",
        createdAt: "2024-04-28T10:00:00Z",
        updatedAt: "2024-04-28T10:00:00Z",
        publishedAt: "2024-04-28T11:00:00Z",
        Author: "PicksOffice"
      }
    ];

    try {
      // Versuche erst die echten Daten von der API zu holen
      // First, get the total count of records with a small pageSize
      const countQuery = 'publicationState=live&pagination[pageSize]=1&pagination[page]=1';
      const countResponse = await fetchAPI<Pick>('/picks', {}, countQuery, true);
      
      // Extract pagination information
      const totalItems = countResponse.meta?.pagination?.total || 0;
      
      // Wenn keine Items vorhanden oder Fehler aufgetreten ist, verwende Mock-Daten
      if (totalItems === 0) {
        console.log('No items found in API, using mock data');
        return { 
          data: mockData,
          meta: {
            pagination: {
              page: 1,
              pageSize: mockData.length,
              pageCount: 1,
              total: mockData.length,
            },
          }
        };
      }
      
      const pageSize = 100; // Reasonable page size for batch fetching
      const pageCount = Math.ceil(totalItems / pageSize);
      
      console.log(`Total picks: ${totalItems}, Pages: ${pageCount}, Page size: ${pageSize}`);
      
      // Fetch all pages in parallel
      const fetchPromises = [];
      for (let page = 1; page <= pageCount; page++) {
        const pageQuery = `sort=Date:desc&publicationState=live&populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`;
        fetchPromises.push(fetchAPI<Pick>('/picks', {}, pageQuery, true));
      }
      
      // Wait for all requests to complete
      const responses = await Promise.all(fetchPromises);
      
      // Collect all items from all pages
      let allItems: any[] = [];
      responses.forEach(response => {
        if (response.data && Array.isArray(response.data)) {
          allItems = [...allItems, ...response.data];
        }
      });
      
      console.log(`Successfully fetched ${allItems.length} picks across ${pageCount} pages`);
      
      if (!allItems.length) {
        console.log('No items found after fetching all pages, using mock data');
        return { 
          data: mockData,
          meta: {
            pagination: {
              page: 1,
              pageSize: mockData.length,
              pageCount: 1,
              total: mockData.length,
            },
          }
        };
      }

      // Transform Strapi response to match Pick interface
      const data = allItems.map((item: any) => {
        // Handle both nested attributes structure and flat structure
        if (item.attributes) {
          return {
            ...item.attributes,
            id: item.id,
            documentId: item.attributes.documentId || item.id,
          };
        } else {
          // Directly use the item if it doesn't have attributes nested structure
          return {
            ...item,
            id: item.id || Math.random(), // Fallback ID if none exists
            documentId: item.documentId || item.id || String(Math.random()),
          };
        }
      });

      return {
        data,
        meta: {
          pagination: {
            page: 1,
            pageSize: data.length,
            pageCount: 1,
            total: data.length,
          },
        },
      };
    } catch (apiError) {
      console.error('API connection error, using mock data:', apiError);
      return { 
        data: mockData,
        meta: {
          pagination: {
            page: 1,
            pageSize: mockData.length,
            pageCount: 1,
            total: mockData.length,
          },
        }
      };
    }
  } catch (error) {
    console.error('Error fetching all picks:', error);
    // Selbst im Fehlerfall machen wir die Anwendung nutzbar mit Mock-Daten
    return { 
      data: [
        {
          id: 1,
          documentId: "1",
          League: "NBA",
          Date: "2024-04-25T20:00:00Z",
          Away: "Timberwolves",
          Home: "Nuggets",
          Pick: "Timberwolves +4.5",
          Stake: 2,
          Odds: 1.91,
          Result: "Win",
          Summary: "The Wolves are showing incredible defensive prowess in this series and should cover the spread again.",
          Writeup: "After a dominant performance in Game 1, the Timberwolves continue to impress with their defensive intensity.",
          Slug: "timberwolves-nuggets-apr25",
          createdAt: "2024-04-24T12:00:00Z",
          updatedAt: "2024-04-26T10:00:00Z",
          publishedAt: "2024-04-24T14:00:00Z",
          Author: "PicksOffice"
        }
      ],
      meta: {
        pagination: {
          page: 1,
          pageSize: 1,
          pageCount: 1,
          total: 1,
        },
      }
    };
  }
}