import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

const PromptCard = (prop) => {
  const post = prop.post
  const handleTagClicks = prop.handleTagClicks
  const handleEdit = prop.handleEdit
  const handleDelete = prop.handleDelete
  const {data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("")

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=> setCopied(""), 3000);
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start item-center gap-3 cursor-pointer"
         onClick={handleProfileClick}>
          <Image
          src={post.creator.image}
          alt="user_image"
          width={40}
          height={40}
          className="rounded-full object-contain"
          />
          <div className="flex flex-col self-center">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
          src={copied === post.prompt? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'
          }
          alt="Copy-Icon"
          width={12}
          height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <div className="inline-flex space-x-2">
    {post.tag.split(' ').map((tag, index) => (
      <span
        key={index}
        className="font-inter text-sm text-purple-500 cursor-pointer"
        onClick={() => handleTagClicks && handleTagClicks(tag)}
      >
        {tag}
      </span>
    ))}
  </div>

          {session?.user.id === post.creator._id && pathName === "/profile"
          && (
            <div className="mt-5 flex-end gap-4 border-t border-gray=100 pt-3">
              <button className="px-5 py-1.5 text-sm bg-yellow-500 rounded-full text-white" onClick={handleEdit}>
                Edit
              </button>
              <button className="px-5 py-1.5 text-sm bg-red-500 rounded-full text-white" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )
          }

      </div>
  )
}

export default PromptCard