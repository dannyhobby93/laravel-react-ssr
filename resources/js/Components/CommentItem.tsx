import { TrashIcon, UserIcon } from "@heroicons/react/16/solid";
import { useForm, usePage } from "@inertiajs/react";

import { Comment } from "@/types";
import { can } from "@/helpers";

function CommentItem({ comment }: { comment: Comment }) {
  const user = usePage().props.auth.user;
  const form = useForm();

  const deleteComment = () => {
    form.delete(route("comment.destroy", comment.id), {
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <div className="flex gap-4 mb-3">
      <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
        <UserIcon className="size-6" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold mt-1">
          {comment.user.name}
          <span className="text-gray-500 text-xs ml-4">
            {comment.created_at}
          </span>
        </h3>
        <div className="italic mt-1">{comment.comment}</div>
      </div>
      {can(user, "manage_comments") && user.id === comment.user.id && (
        <div className="flex items-center py-2 px-6">
          <button onClick={deleteComment}>
            <TrashIcon className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentItem;
