import * as z from "zod";


const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const UploadProfileImageSchema = z.object({
    profileImage: z.instanceof(File).superRefine((file, ctx) =>{
        // First, add an issue if the mime type is wrong.
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `File must be one of [${ACCEPTED_IMAGE_TYPES.join(
                    ", "
                )}] but was ${file.type}`
            });
        }

        // Next add an issue if the file size is too large.
        if (file.size > MAX_FILE_SIZE) {
            ctx.addIssue({
                code: z.ZodIssueCode.too_big,
                type: "array",
                message: `The file must not be larger than ${MAX_FILE_SIZE} bytes: ${
                    file.size
                }`,
                maximum: MAX_FILE_SIZE,
                inclusive: true
            });
        }
    })
});