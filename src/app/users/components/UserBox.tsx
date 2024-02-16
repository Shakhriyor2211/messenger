"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { BarLoader } from "react-spinners";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

import Avatar from "../../components/Avatar";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", { userId: data.id })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      <div
        onClick={handleClick}
        className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
          dark:bg-dusk
          dark:hover:bg-lightgray
        "
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <div className="relative">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{data.name}</p>
                <div className="absolute right-0 mt-1">
                  {isLoading && <BarLoader loading={true} color="#36d7b7" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
