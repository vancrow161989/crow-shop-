import { formatDate } from "./../../utils/helpers";
function ProfileAccount({ profileData }) {
  const { username, email, createdAt } = profileData ?? {};

  return (
    <div className="profile-account">
      <h2 className="md:text-xlg font-body text-3xl  leading-normal text-gray-700">
        Account
      </h2>
      <div>
        <p>
          Username : <span className="font-semibold">{username}</span>
        </p>
        <p>
          Email Address : <span className="font-semibold">{email}</span>
        </p>
        <p>
          Account created :{" "}
          <span className="font-semibold">{formatDate(createdAt)}</span>
        </p>
      </div>
    </div>
  );
}

export default ProfileAccount;
