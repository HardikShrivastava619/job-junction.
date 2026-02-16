import { useState } from "react";
import { useParams } from "react-router-dom";

export const OtherUserSidebarLogic = () => {
  try {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [name, setName] = useState(null);

    const params = useParams();

    const handleMore = async () => {
      try {
        const res = await fetch(
          `http://localhost:1800/api/user/get_ourProfile/${params?.id}`,
        );
        const data = await res.json();

        if (data?.success) {
          setName(data?.user?.name);
          setProfilePhoto(data?.user?.profile_photo);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return { handleMore, profilePhoto, name };
  } catch (error) {
    console.log(error);
  }
};
