"use client";
import { addToWishlist } from "@/apis/wishlist/actions/addToWishlist.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { toast } from "sonner";
interface WishListComp {
  children: ReactNode;
  cls: string;
  id: string;
}
export default function AddToWishlist({ children, cls, id }: WishListComp) {
  const queryClient = useQueryClient();
  const { data, mutate } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: (data) => {
      console.log(data)
      if(data?.statusMsg ==='fail'){
        toast.error(data?.message, {
        position: "top-right",
      })
      }
      else{toast.success("The Product Added Successfully to your Wishlist", {
        position: "top-right",
      });
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });}
    },
    onError: () => {
      toast.error("login first");
    },
  });
  function handleAddToWishlist() {
    mutate(id);
  }
  return (
    <button onClick={handleAddToWishlist} className={cls}>
      {children}
    </button>
  );
}
