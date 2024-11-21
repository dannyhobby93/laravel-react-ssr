import { Feature } from "@/types";
import { FormEventHandler } from "react";
import PrimaryButton from "./PrimaryButton";
import TextArea from "./TextArea";
import { useForm } from "@inertiajs/react";

function CommentForm({ feature }: { feature: Feature }) {
  const { data, setData, post, processing } = useForm({
    comment: "",
  });

  const createComment: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("comment.store", feature.id), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setData("comment", ""),
    });
  };

  return (
    <form
      onSubmit={createComment}
      className="flex items-center py-2 rounded-lg bg-gray-50 dark:bg-gray-800 mb-4 gap-x-4"
    >
      <label className="sr-only">Your Comment</label>
      <TextArea
        value={data.comment}
        onChange={(e) => setData("comment", e.target.value)}
        className="mt-1 block w-full"
        placeholder="Leave a comment..."
        rows={1}
      ></TextArea>
      <PrimaryButton disabled={processing}>Submit</PrimaryButton>
    </form>
  );
}

export default CommentForm;
