export type GetUserByIdType = {
    status: string,
    message: string,
    status_code: number,
    users: {
        id: string,
        profile: string | null,
        full_name: string,
        age: number,
        address:
            {
                street: string,
                neighborhood: string,
                state: string,
            },
        biography: string,
        created_at: string,
        updated_at: string
    }
}