import { DefaultUser } from "next-auth";

type Modify<T, R> = Omit<T, keyof R> & R;

interface ModifiedDefaultUser extends Modify<DefaultUser, {
    id: number;
}> {}

