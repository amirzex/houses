import { useState } from "react";
import Image from "next/image";

import userprofile from "../../assets/reserve/Ellipse 15.svg";

import {
    useCreateComment,
    useHouseComments,
    useUpdateComment,
} from "@/core/api/comments/queries";

const ReserveComments = ({ id }: { id: string }) => {

    const { data } = useHouseComments(id);

    const { mutate: createComment } = useCreateComment();
    const { mutate: updateComment } = useUpdateComment();

    const [caption, setCaption] = useState("");
    const [title, setTitle] = useState("");

    const [parentCommentId, setParentCommentId] = useState(null);

    const [editingCommentId, setEditingCommentId] = useState(null);

    const handleSendComment = () => {

        if (!caption.trim()) return;

        if (editingCommentId) {
            updateComment({
                id: editingCommentId,
                data: {
                    title: title || "نظر کاربر",
                    caption,
                    rating: 5
                }
            });

            setEditingCommentId(null);
        } else {

            createComment({
                house_id: Number(id),
                title: title || "نظر کاربر",
                caption,
                rating: 5,
                parent_comment_id: parentCommentId
            });

        }

        setCaption("");
        setTitle("");
        setParentCommentId(null);
    };


    const handleEdit = (comment: any) => {
        setEditingCommentId(comment.id);
        setCaption(comment.caption);
        setTitle(comment.title);
    };


    return (
        <div className="surface-card mt-2 w-full" dir="rtl">
            <section className="w-full p-5 sm:p-6">
                <h3 className="mb-4 text-base font-extrabold text-ink dark:text-white">نظرات کاربران</h3>

                <div className="mb-6 max-h-80 space-y-4 overflow-y-auto pe-1">
                    {data?.comments?.length ? data.comments.map((comment: any) => (
                        <div key={comment.id} className="rounded-2xl border border-border/60 bg-muted/40 p-4 dark:border-white/10 dark:bg-[#2a3340]/40">
                            <div className="mb-3 flex items-center gap-3 border-b border-border/50 pb-3 dark:border-white/10">
                                <Image
                                    src={userprofile}
                                    alt="profile"
                                    width={44}
                                    height={44}
                                    className="size-11 rounded-full object-cover ring-2 ring-brand/15"
                                />

                                <div className="flex min-w-0 flex-1 flex-col">
                                    <span className="truncate text-sm font-bold text-ink dark:text-white">
                                        {comment.user?.firstName} {comment.user?.lastName}
                                    </span>
                                    <span className="text-xs text-ink-muted">
                                        {new Date(comment.created_at).toLocaleDateString("fa-IR")}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleEdit(comment)}
                                    className="rounded-full border border-brand/30 px-3 py-1.5 text-xs font-bold text-brand transition hover:bg-brand hover:text-white"
                                >
                                    ویرایش
                                </button>
                            </div>

                            <p className="text-sm leading-7 text-ink-muted dark:text-white/75">
                                {comment.caption}
                            </p>
                        </div>
                    )) : (
                        <p className="py-6 text-center text-sm text-ink-muted">هنوز نظری ثبت نشده است</p>
                    )}
                </div>

                <div>
                    <p className="mb-3 text-sm font-bold text-ink dark:text-white">
                        {editingCommentId ? "ویرایش نظر" : "نظر خود را وارد کنید"}
                    </p>

                    <div className="flex flex-col gap-3 rounded-2xl bg-muted/50 p-4 dark:bg-[#2a3340]/50">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="عنوان نظر"
                            className="field-input rounded-xl bg-card"
                        />

                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="نظر خود را بنویسید..."
                            rows={4}
                            className="field-input resize-none rounded-xl bg-card"
                        />

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleSendComment}
                                className="btn-brand px-6"
                            >
                                {editingCommentId ? "ویرایش نظر" : "ارسال نظر"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReserveComments;
