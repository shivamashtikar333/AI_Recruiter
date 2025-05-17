"use client";
import React, { useState, useEffect, useContext, use } from "react";
import { supabase } from "@/services/supabaseClient";
import { UserDetailContext } from "@/context/UserDetailContext";

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = () => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      // Check if user exists in the database
      let { data: Users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user?.email);

      // If user does not exist, create a new user
      if (Users?.length === 0) {
        const { data, error } = await supabase.from("Users").insert([
          {
            name: user?.user_metadata.full_name,
            email: user?.email,
            picture: user?.user_metadata.picture,
          },
        ]);
        console.log("User created: ", data);
        setUser(data);
        return;
      }
      setUser(Users[0]);
    });
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
};

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
