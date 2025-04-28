import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { provider: string } }
) {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get('access_token');
  const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
  
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login?error=Social login failed', request.url));
  }

  // Token aus dem Social-Provider an Strapi senden
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/auth/${params.provider}/callback?access_token=${accessToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate');
    }

    const data = await response.json();

    // Redirect zur Hauptseite und füge JWT als Query-Parameter hinzu
    // Der JWT wird dann vom Client abgefangen und im localStorage gespeichert
    return NextResponse.redirect(new URL(`/?jwt=${data.jwt}&user=${encodeURIComponent(JSON.stringify(data.user))}`, request.url));
  } catch (error) {
    console.error('Social auth callback error:', error);
    return NextResponse.redirect(new URL('/login?error=Authentication failed', request.url));
  }
}