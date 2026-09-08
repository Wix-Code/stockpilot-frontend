import { Save } from "lucide-react";

export function SaveButton() {
  return (
    <div className="flex justify-end border-t border-[#E4E0D6] pt-5">
      <button
        type="submit"
        className="
          inline-flex h-11
          items-center gap-2
          rounded-xl
          bg-green px-5
          text-sm font-bold
          text-white
          hover:bg-green-deep
        "
      >
        <Save size={16} />
        Save changes
      </button>
    </div>
  );
}
