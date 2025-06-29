"use client";

import { formatToUSD } from "@/helpers/format-number";
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
  Textarea,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { HiDocumentText, HiHome } from "react-icons/hi";
import type { ECommerceBillingPageData } from "./page";

function ECommerceBillingPageContent({
  nextPayment,
  orderHistory,
}: ECommerceBillingPageData) {
  return (
    <>
      <div className="mb-4 grid grid-cols-1 gap-y-6 px-4 pt-6 xl:grid-cols-2 xl:gap-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="col-span-full xl:mb-2">
          <Breadcrumb className="mb-5">
            <BreadcrumbItem href="#">
              <div className="flex items-center gap-x-3">
                <HiHome className="text-xl" />
                <span className="dark:text-white">Home</span>
              </div>
            </BreadcrumbItem>
            <BreadcrumbItem href="/e-commerce/products">
              E-commerce
            </BreadcrumbItem>
            <BreadcrumbItem>Billing</BreadcrumbItem>
          </Breadcrumb>
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Billing
          </h1>
        </div>
        <IntroCard nextPayment={nextPayment} />
        <OrderHistoryCard orderHistory={orderHistory} />
      </div>
      <div className="grid grid-cols-1 gap-y-4 px-4">
        <GeneralInfoCard />
        <CardDetailsCard />
      </div>
    </>
  );
}

function IntroCard({
  nextPayment,
}: Pick<ECommerceBillingPageData, "nextPayment">) {
  return (
    <Card>
      <Link
        href="#"
        className="mb-6 inline-flex items-center text-2xl font-bold dark:text-white"
      >
        <Image
          alt=""
          width={43}
          height={44}
          src={nextPayment.logo}
          className="mr-4 h-11"
        />
        <span>{nextPayment.service}</span>
      </Link>
      <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
        {nextPayment.serviceDescription}
      </p>
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        Next payment of ${nextPayment.amount} ({nextPayment.interval}) occurs
        on&nbsp;
        {nextPayment.date}.
      </p>
      <div className="mt-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-3">
        <div>
          <Link
            href="#"
            className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 sm:w-auto"
          >
            <HiDocumentText className="mr-2 -ml-1 h-5 w-5" />
            Change Plan
          </Link>
        </div>
        <div>
          <Link
            href="#"
            className="focus:ring-primary-300 inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 sm:w-auto dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            Cancel Subscription
          </Link>
        </div>
      </div>
    </Card>
  );
}

function OrderHistoryCard({
  orderHistory,
}: Pick<ECommerceBillingPageData, "orderHistory">) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Order History
        </h3>
        <div className="shrink-0">
          <Link
            href="#"
            className="text-primary-700 dark:text-primary-500 rounded-lg p-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            View all
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <Table striped>
                <TableHead
                  className="bg-gray-50 dark:bg-gray-700"
                  theme={{
                    cell: {
                      base: "p-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400",
                    },
                  }}
                >
                  <TableRow>
                    <TableHeadCell>Transaction</TableHeadCell>
                    <TableHeadCell>Date &amp; Time</TableHeadCell>
                    <TableHeadCell>Amount</TableHeadCell>
                    <TableHeadCell>Status</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderHistory.map(({ transaction, time, amount, status }) => (
                    <TableRow key={`${transaction}-${time}`}>
                      <TableCell className="p-4 text-sm font-normal whitespace-nowrap text-gray-900 dark:text-white">
                        {transaction}
                      </TableCell>
                      <TableCell className="p-4 text-sm font-normal whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {time}
                      </TableCell>
                      <TableCell className="p-4 text-sm font-semibold whitespace-nowrap text-gray-900 dark:text-white">
                        {formatToUSD(amount)}
                      </TableCell>
                      <TableCell className="flex p-4 whitespace-nowrap">
                        <Badge
                          className="rounded-md font-medium"
                          color={status === "Completed" ? "success" : "failure"}
                        >
                          {status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function GeneralInfoCard() {
  return (
    <Card>
      <h3 className="mb-4 text-xl font-bold dark:text-white">
        General Information
      </h3>
      <form>
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="col-span-1 grid grid-cols-1 gap-y-4">
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <TextInput
                id="first-name"
                name="first-name"
                placeholder="Bonnie"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="organization">Organization</Label>
              <TextInput
                id="organization"
                name="organization"
                placeholder="Company Name"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="department">Department</Label>
              <TextInput
                id="department"
                name="department"
                placeholder="Development"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="city">City</Label>
              <TextInput
                id="city"
                name="city"
                placeholder="e.g. San Francisco"
                required
              />
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-1 gap-y-4">
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <TextInput
                id="last-name"
                name="last-name"
                placeholder="Green"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="role">Role</Label>
              <TextInput
                id="role"
                name="role"
                placeholder="React Developer"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="country">Country</Label>
              <TextInput
                id="country"
                name="country"
                placeholder="United States"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="email">Email</Label>
              <TextInput
                id="email"
                name="email"
                placeholder="example@company.com"
                required
              />
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-y-2">
            <Label htmlFor="info">Info</Label>
            <Textarea
              id="info"
              name="info"
              placeholder="Receipt Info (optional)"
              rows={12}
              className="h-full"
            />
          </div>
        </div>
        <Button color="blue" type="submit">
          Update
        </Button>
      </form>
    </Card>
  );
}

function CardDetailsCard() {
  return (
    <Card>
      <h3 className="mb-4 text-xl font-bold dark:text-white">Card Details</h3>
      <form>
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="grid grid-cols-1 gap-y-2">
            <Label htmlFor="full-name">(Full name as displayed on card)*</Label>
            <TextInput
              id="full-name"
              name="full-name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-y-2">
            <Label htmlFor="card-number">Card Number *</Label>
            <TextInput
              id="card-number"
              name="card-number"
              placeholder="xxxx-xxxx-xxxx-xxxx"
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-y-2">
            <Label htmlFor="cvc">CVC *</Label>
            <TextInput id="cvc" name="cvc" placeholder="•••" required />
          </div>
          <div className="grid grid-cols-1 gap-y-2">
            <Label htmlFor="zip">Postal / ZIP code (optional)</Label>
            <TextInput id="zip" name="zip" placeholder="e.g. 12345" required />
          </div>
        </div>
        <Button color="blue">Update</Button>
      </form>
    </Card>
  );
}

export default ECommerceBillingPageContent;
