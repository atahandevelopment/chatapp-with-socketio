// Hem sohbet odaları hem de kullanıcılar için kullanılan type..

export type Users = {
    _id: string;
    fullname: string;
    email: string;
    password: string;
    isAvatarImageSet: boolean;
    avatarImage: string;
    name: string; // oda ismi için eklendi
}