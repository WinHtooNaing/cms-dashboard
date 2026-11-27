import { useState } from "react"

import {
  Users,
  Package,
  ShoppingCart,
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plus,
  Pencil,
  Trash2,
  ShoppingBag,
  UserPlus,
  FileText,
  Clock,
  MoreHorizontal,
  Download,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// ------------------------------------
// MOCK DATA
// ------------------------------------

const statistics = [
  {
    title: "Total Users",
    value: "1,250",
    change: "+12.5%",
    positive: true,
    description: "Compared to last month",
    icon: Users,
  },
  {
    title: "Total Products",
    value: "320",
    change: "+8.2%",
    positive: true,
    description: "Compared to last month",
    icon: Package,
  },
  {
    title: "Total Orders",
    value: "856",
    change: "+18.4%",
    positive: true,
    description: "Compared to last month",
    icon: ShoppingCart,
  },
  {
    title: "Total Revenue",
    value: "25.6M Ks",
    change: "-2.4%",
    positive: false,
    description: "Compared to last month",
    icon: Wallet,
  },
]

// ------------------------------------
// RECENT ACTIVITIES
// ------------------------------------

const activities = [
  {
    id: 1,
    user: "Susil Kyan",
    role: "ADMIN",
    action: "created a new product",
    target: "iPhone 17 Pro Max",
    module: "Products",
    time: "2 minutes ago",
    icon: Plus,
    color: "text-green-600 bg-green-100",
  },
  {
    id: 2,
    user: "John Smith",
    role: "STAFF",
    action: "updated order status",
    target: "Order #ORD-1024",
    module: "Orders",
    time: "15 minutes ago",
    icon: ShoppingBag,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: 3,
    user: "Admin",
    role: "ADMIN",
    action: "created a new user",
    target: "David",
    module: "Users",
    time: "30 minutes ago",
    icon: UserPlus,
    color: "text-purple-600 bg-purple-100",
  },
  {
    id: 4,
    user: "Susil Kyan",
    role: "ADMIN",
    action: "updated product information",
    target: "MacBook Pro M4",
    module: "Products",
    time: "1 hour ago",
    icon: Pencil,
    color: "text-orange-600 bg-orange-100",
  },
  {
    id: 5,
    user: "Manager",
    role: "STAFF",
    action: "deleted a category",
    target: "Old Accessories",
    module: "Categories",
    time: "2 hours ago",
    icon: Trash2,
    color: "text-red-600 bg-red-100",
  },
  {
    id: 6,
    user: "Admin",
    role: "ADMIN",
    action: "updated website footer",
    target: "Footer Description",
    module: "CMS",
    time: "3 hours ago",
    icon: FileText,
    color: "text-indigo-600 bg-indigo-100",
  },
]

// ------------------------------------
// CHART DATA
// ------------------------------------

const chartData = [
  { day: "Mon", users: 35, orders: 50 },
  { day: "Tue", users: 55, orders: 40 },
  { day: "Wed", users: 40, orders: 70 },
  { day: "Thu", users: 75, orders: 55 },
  { day: "Fri", users: 50, orders: 85 },
  { day: "Sat", users: 90, orders: 65 },
  { day: "Sun", users: 65, orders: 95 },
]

// ------------------------------------
// OVERVIEW COMPONENT
// ------------------------------------

const Overview = () => {
  const [activityFilter, setActivityFilter] = useState("All")

  const filteredActivities =
    activityFilter === "All"
      ? activities
      : activities.filter((activity) => activity.module === activityFilter)

  return (
    <div className="space-y-6 pb-8">
      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Overview</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor activities and performance across Tech Haven.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 size-4" />
            Export Report
          </Button>

          <Button size="sm">Last 7 Days</Button>
        </div>
      </div>

      {/* STATISTICS */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.positive ? TrendingUp : TrendingDown

          return (
            <Card key={stat.title}>
              <CardContent className="px-5 py-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>

                  <div className="rounded-lg bg-muted p-2">
                    <Icon className="size-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="mt-3">
                  <h2 className="text-2xl font-bold tracking-tight">
                    {stat.value}
                  </h2>

                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`flex items-center gap-1 text-xs font-medium ${
                        stat.positive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <TrendIcon className="size-3" />
                      {stat.change}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {stat.description}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* ACTIVITY ANALYTICS */}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Activity Analytics</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Overview of user and order activity this week.
            </p>
          </div>

          <Badge variant="secondary">This Week</Badge>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-5 text-sm">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-primary" />
              User Registrations
            </div>

            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-blue-400" />
              Orders
            </div>
          </div>

          {/* Simple CSS Bar Chart */}

          <div className="mt-8 flex h-56 items-end justify-between gap-3">
            {chartData.map((item) => (
              <div
                key={item.day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
              >
                <div className="flex h-full w-full items-end justify-center gap-1">
                  <div
                    className="w-4 rounded-t-sm bg-primary transition-all"
                    style={{ height: `${item.users}%` }}
                    title={`Users: ${item.users}`}
                  />

                  <div
                    className="w-4 rounded-t-sm bg-blue-400 transition-all"
                    style={{ height: `${item.orders}%` }}
                    title={`Orders: ${item.orders}`}
                  />
                </div>

                <span className="text-xs text-muted-foreground">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ACTIVITY + SYSTEM OVERVIEW */}

      <div className="grid gap-6 xl:grid-cols-3">
        {/* RECENT ACTIVITIES */}

        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base">
                Recent System Activities
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Track everything happening across your system.
              </p>
            </div>

            <Button variant="ghost" size="sm">
              View All
              <ArrowUpRight className="ml-1 size-4" />
            </Button>
          </CardHeader>

          <CardContent>
            {/* FILTERS */}

            <div className="mb-5 flex flex-wrap gap-2">
              {["All", "Products", "Orders", "Users", "CMS", "Categories"].map(
                (filter) => (
                  <Button
                    key={filter}
                    size="sm"
                    variant={activityFilter === filter ? "default" : "outline"}
                    onClick={() => setActivityFilter(filter)}
                    className="h-8 text-xs"
                  >
                    {filter}
                  </Button>
                )
              )}
            </div>

            {/* ACTIVITY LIST */}

            <div className="space-y-5">
              {filteredActivities.map((activity) => {
                const Icon = activity.icon

                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full ${activity.color}`}
                    >
                      <Icon className="size-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold">
                          {activity.user}
                        </span>

                        <Badge variant="outline" className="text-[10px]">
                          {activity.role}
                        </Badge>
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {activity.action}{" "}
                        <span className="font-medium text-foreground">
                          {activity.target}
                        </span>
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {activity.module}
                        </span>

                        <span className="text-muted-foreground">·</span>

                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3" />
                          {activity.time}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </div>
                )
              })}

              {filteredActivities.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No activities found.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* SYSTEM OVERVIEW */}

        <div className="space-y-6">
          {/* USER DISTRIBUTION */}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">User Distribution</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              {[
                { name: "Administrators", count: 5, percentage: 20 },
                { name: "Staff Members", count: 12, percentage: 35 },
                { name: "Customers", count: 1233, percentage: 85 },
              ].map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {item.name}
                    </span>

                    <span className="text-sm font-semibold">
                      {item.count.toLocaleString()}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* PRODUCT STATUS */}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Product Status</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <span className="size-2 rounded-full bg-green-500" />
                  Active Products
                </div>

                <span className="font-semibold">280</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <span className="size-2 rounded-full bg-orange-500" />
                  Inactive Products
                </div>

                <span className="font-semibold">40</span>
              </div>
            </CardContent>
          </Card>

          {/* ORDER STATUS */}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Order Status</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {[
                { name: "Pending", count: 45, color: "bg-orange-500" },
                { name: "Processing", count: 28, color: "bg-blue-500" },
                { name: "Completed", count: 760, color: "bg-green-500" },
                { name: "Cancelled", count: 23, color: "bg-red-500" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`size-2 rounded-full ${item.color}`} />

                    {item.name}
                  </div>

                  <span className="font-semibold">{item.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Overview
