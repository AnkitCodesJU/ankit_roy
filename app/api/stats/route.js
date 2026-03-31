import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ visits: 0, likes: 0 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action } = body; // 'visit' or 'like'
    
    let currentData = { visits: 0, likes: 0 };
    try {
      const fileData = await fs.readFile(dataFilePath, 'utf8');
      currentData = JSON.parse(fileData);
    } catch (e) {
      // File doesn't exist yet or is invalid
    }

    if (action === 'visit') {
      currentData.visits += 1;
    } else if (action === 'like') {
      currentData.likes += 1;
    }

    await fs.writeFile(dataFilePath, JSON.stringify(currentData, null, 2));
    
    return NextResponse.json(currentData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update stats' }, { status: 500 });
  }
}
