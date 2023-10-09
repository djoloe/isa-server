/* eslint-disable @typescript-eslint/no-unused-vars */
import { FriendRepository } from '../repository/friendsRepository';
import { MailSender } from './mailService';

export class FriendService {
  private friendObj = new FriendRepository();
  private friendsArray: any = [];

  public constructor() {}

  public async parseFriends(data: object) {
    const friends = JSON.parse(JSON.stringify(data));
    for (const friend of friends.array) {
      new MailSender(friend.firstName, friend.lastName, friend.contact, friend.date, friends.idUser);
    }
  }

  public acceptedFriends(friend: any, id: number) {
    this.friendsArray.push(friend);
    this.friendObj.saveFriend(friend.first, friend.last, friend.email, friend.date, id);
  }

  public deleteFriends(id: number) {
    this.friendObj.deleteFriendsBase(id);
  }

  public async checkUserFriends(id: number) {
    return await this.friendObj.checkUserFriendsBase(id);
  }
}
