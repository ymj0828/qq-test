import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  getRecipientsList,
  postRecipientsImageUrl,
  postRecipientsList
} from "@/api/recipients";

export const useGetRecipientsList = () =>
  useSuspenseQuery({
    queryKey: ["recipientsList"],
    queryFn: () => getRecipientsList()
  });

export const usePostRecipientsList = () =>
  useMutation({
    mutationFn: (value) => postRecipientsList(value)
  });

export const usePostRecipientsImageUrl = () =>
  useMutation({
    mutationFn: (formData) => postRecipientsImageUrl(formData)
  });
