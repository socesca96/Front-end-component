//AQuí voy a necesitar el token
export const updateUserFetch = async (formData, token) => {

    const res = await fetch(`http://localhost:3000/user/user`, {
        method: "PUT",
        headers: {
            "auth-token": token,
        },
        body: formData
    })
    if(!res.ok) {
        throw new Error("Error al actualizar usuario")
    }
    return await res.json()
}