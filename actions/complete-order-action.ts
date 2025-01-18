"use server"

import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";
import { revalidatePath } from "next/cache";

export async function completeOrder(formData: FormData) {
    const data = {
        orderId: formData.get("order_id")
    }
    try {
        const result = OrderIdSchema.safeParse(data);
        if (result.success) {
            await prisma.order.update({
                where: {
                    id: result.data.orderId
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            });

            revalidatePath("/admin/orders");
        }
    } catch (error) {
        console.log(error);
    }   
}