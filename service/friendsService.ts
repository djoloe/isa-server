import { FriendRepository } from '../repository/friendsRepository';

export class FriendService {
  private friendObj = new FriendRepository();
  public constructor() {}

  public async parseFriends(data: object) {
    const friends = JSON.parse(JSON.stringify(data));
    this.friendObj.setUser(friends.idUser);
    for (const friend of friends.array) {
      await this.friendObj.saveFriend(friend.firstName, friend.lastName, friend.contact, friend.date);
    }
  }

  public deleteFriends(id: number) {
    this.friendObj.deleteFriendsBase(id);
  }

  public async checkUserFriends(id: number) {
    return await this.friendObj.checkUserFriendsBase(id);
  }
}
