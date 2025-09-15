import { UserDto, UserJwtPayload } from "../dtos/Auth";

/**
 * Maps a decoded JWT payload to the UserDto format.
 * This function transforms the 'sub' field into 'email'.
 * @param payload The decoded JWT payload.
 * @returns The UserDto object.
 */
export function mapJwtPayloadToUserDto(payload: UserJwtPayload): UserDto {
  return {
    userId: payload.userId,
    email: payload.sub,
    role: payload.role,
    exp: payload.exp,
    iat: payload.iat,
  };
}
