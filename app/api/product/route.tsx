import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    try {
        const product = await prisma.product.findMany();

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({
            error: error
        }, {
            status: 500
        });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, category, price, description } = await req.json();

        if(!name || !category || !price || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                category,
                price,
                description,
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({
            error: error,
        }, {
            status: 500,
        });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        const { id } = body;

        if(!id) {
            return NextResponse.json({
                error: "Missing required field"
            }, {
                status: 400
            });
        }

        const product = await prisma.product.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({
            error: error,
        }, {
            status: 500,
        });
    }
}