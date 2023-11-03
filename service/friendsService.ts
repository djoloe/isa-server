/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from 'jsonwebtoken';
import { FriendRepository } from '../repository/friendsRepository';
import { MailSender } from './mailService';
import { TokenService } from './tokenService';

export class FriendService {
  private friendObj = new FriendRepository();
  private friendsArray: any = [];
  private tokenService = new TokenService();

  public constructor() {}

  public async parseFriends(data: object, headers: any) {
    const friends = JSON.parse(JSON.stringify(data));
    const tokenBase = this.tokenService.decodeToken(headers);
    for (const friend of friends.array) {
      new MailSender(friend.firstName, friend.lastName, friend.contact, friend.date, (tokenBase as JwtPayload).idUser);
    }
  }

  public acceptedFriends(friend: any) {
    this.friendsArray.push(friend);
    this.friendObj.saveFriend(friend.first, friend.last, friend.email, friend.date, friend.id);
  }

  public deleteFriends(id: number) {
    this.friendObj.deleteFriendsBase(id);
  }

  public async checkUserFriends(id: number) {
    return await this.friendObj.checkUserFriendsBase(id);
  }
}
