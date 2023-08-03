import { useState } from "react";
import { useGetMyUserDataQuery } from "../../store/users";
import { useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo";
import ProfileAccount from "./ProfileAccount";
import { selectCurrentUser } from "./../../store/authSlice";

function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const { data: profileData, isLoading } = useGetMyUserDataQuery();
  const currentUser = useSelector(selectCurrentUser);

  const renderTabContent = () => {
    return activeTab === 0 ? (
      <section className="mb-4 lg:mb-16 lg:pr-4">
        <ProfileInfo profileData={currentUser} />
      </section>
    ) : (
      <section className="mb-4 lg:mb-16 lg:pr-4">
        <ProfileAccount profileData={currentUser} />
      </section>
    );
  };
  return (
    !isLoading && (
      <div className="container flex min-h-[400px] max-w-5xl justify-center px-4 lg:min-h-[600px] lg:px-0">
        <div className="profile-wrap flex flex-col-reverse lg:shrink-0 lg:grow lg:flex-row  lg:gap-14  lg:gap-3">
          <div className="sidebar mb-8 lg:mb-0 lg:w-56 lg:flex-shrink-0 lg:border-r-2 lg:py-12">
            <div className="sticky top-9 overflow-y-hidden">
              <h3 className="mb-8 mt-4 pl-2 font-semibold uppercase">Menu</h3>
              <ul>
                <li className="mb-4 border-b-2 pb-3 pl-2 pr-14">
                  <a
                    onClick={() => setActiveTab(0)}
                    className={
                      activeTab === 0
                        ? "cursor-pointer text-primary-500 hover:text-primary-500"
                        : "cursor-pointer hover:text-primary-500"
                    }>
                    Profile Information
                  </a>
                </li>
                <li className="mb-2 border-b-2 pb-3 pl-2 pr-14">
                  <a
                    onClick={() => setActiveTab(1)}
                    className={
                      activeTab === 1
                        ? "cursor-pointer text-primary-500 hover:text-primary-500"
                        : "cursor-pointer hover:text-primary-500"
                    }>
                    Account
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="content py-7 lg:py-12">{renderTabContent()}</div>
        </div>
      </div>
    )
  );
}

export default Profile;
