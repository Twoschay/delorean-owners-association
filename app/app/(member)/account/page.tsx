import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { User, CreditCard, MapPin, Bell, Lock, HelpCircle, ChevronRight } from "lucide-react";

const SECTIONS = [
  { icon: User, title: "Edit Profile", desc: "Update your name, bio, location, and map visibility", href: "/account/edit" },
  { icon: CreditCard, title: "Membership Status", desc: "View your membership card and renewal date", href: "/account/membership" },
  { icon: MapPin, title: "Map Visibility", desc: "Control whether you appear on the global member map", href: "/account/edit#map" },
  { icon: Bell, title: "Notifications", desc: "Configure email notification preferences", href: "/account/notifications" },
  { icon: Lock, title: "Change Password", desc: "Update your login credentials", href: "/account/edit#password" },
  { icon: HelpCircle, title: "Contact Support", desc: "Get help from the DOA team", href: "/contact" },
];

export default function AccountPage() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="font-display text-3xl text-white tracking-wide">
          MY <span className="text-amber">ACCOUNT</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your DOA membership and profile settings</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SECTIONS.map((section) => (
          <Link key={section.title} href={section.href}>
            <Card className="bg-card border-border hover:border-amber/30 transition-all group h-full">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber/20 transition-colors">
                    <section.icon className="h-5 w-5 text-amber" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white group-hover:text-amber transition-colors text-sm mb-1">
                      {section.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{section.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-amber transition-colors flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
