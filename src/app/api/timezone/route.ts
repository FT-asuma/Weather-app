import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lat = parseFloat(url.searchParams.get('lat') || '0');
  const lon = parseFloat(url.searchParams.get('lon') || '0');

  if (isNaN(lat) || isNaN(lon)) {
    return NextResponse.json({ error: 'Invalid latitude or longitude' }, { status: 400 });
  }

  const apiKey = 'UHU6L3IIUWEU';    
  const apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.status === 'OK') {
      return NextResponse.json({ timezone: data.zoneName });
    } else {
      return NextResponse.json({ error: 'Unable to fetch timezone' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching timezone' }, { status: 500 });
  }
}
