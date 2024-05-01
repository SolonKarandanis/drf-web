'use server';
import { basePath } from '@/next.config';

export async function getImageSrcAction(url:string) {
    'use server';

    const path = process.env.NODE_ENV === "production" ? basePath : "";

    const src = `${path}/${url}`;
    return src;

}