export class User {

    _id: string
    FBuserID: string
    username: string
    email: string
    password: string
    passwordConfirmation: string // Frontend only!

    customer: {
        id: string,
        source: string
    }
    description: string
    rating: number
    isVerified: boolean
    phone: number
    postalcode: number
    address: string
    idOfPhoto1: string
    idOfPhoto2: string
    bankAccount: string
    userRole: string
    status: string
    affiliateCode: string
}
