import { ShoppingCart, PackagePlus, RefreshCcw } from "lucide-react";

const activities = [
  {
    title: "Sale completed",
    desc: "iPhone 15 Pro sold",
    time: "2 minutes ago",
    icon: ShoppingCart,
  },
  {
    title: "Stock received",
    desc: "10 units added",
    time: "1 hour ago",
    icon: PackagePlus,
  },
  {
    title: "Stock adjusted",
    desc: "AirPods Pro corrected",
    time: "3 hours ago",
    icon: RefreshCcw,
  },
];

export function RecentActivity() {
  return (
    <div
      className="
rounded-2xl
border border-[#E4E0D6]
bg-white
p-5
"
    >
      <h3
        className="
text-sm
font-bold
text-ink
mb-5
"
      >
        Recent activity
      </h3>

      <div className="space-y-5">
        {activities.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
flex
gap-3
"
            >
              <div
                className="
flex
h-9
w-9
items-center
justify-center
rounded-xl
bg-green-tint
text-green
"
              >
                <Icon size={16} />
              </div>

              <div>
                <p
                  className="
text-sm
font-semibold
text-ink
"
                >
                  {item.title}
                </p>

                <p
                  className="
text-xs
text-stone
"
                >
                  {item.desc}
                </p>

                <p
                  className="
mt-1
text-[11px]
text-stone
"
                >
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
