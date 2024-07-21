export const USER_REGEX = /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

export const USERNAME_REGEX = /^([-_a-zA-ZÀ-ÿ0-9.]){4,20}$/;
export const NAME_REGEX = /^([A-ZÀ-ÿŻŹĆĄŚĘŁÓŃ]+[-,a-zżźćńółęąś. ']*[ ]*)+$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
export const NIP_REGEX = /^(PL[0-9]{10})+$/;
export const REGON_9_REGEX = /^([0-9]{9})+$/;
export const REGON_14_REGEX = /^([0-9]{14})+$/;
export const KRS_REGEX = /^([0-9]{10})+$/;

export const OWN_WEBSITE_URL = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/;
export const FACEBOOK_URL =
  /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(\/)?([\w\-\.]{5,})/;
export const INSTAGRAM_URL = /(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.]{1,30}\/?/;
export const TWITTER_URL = /(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]{5,15}(\?(\w+=\w+&?)*)?/;
export const LINKEDIN_URL = /(https?:\/\/)?(www\.)?linkedin\.com\/[A-Za-z0-9_.]{1,30}/;
export const PINTEREST_URL = /(https?:\/\/)?(www\.)?[a-z_.]{1,3}pinterest\.com\/[A-Za-z0-9_.]{1,30}/;
