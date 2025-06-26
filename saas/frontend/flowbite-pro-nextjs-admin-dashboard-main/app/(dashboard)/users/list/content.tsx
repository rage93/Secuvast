"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiPencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import type { UsersListPageData } from "./page";

function UsersListPageContent({ usersList }: UsersListPageData) {
  return (
    <>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 sm:flex dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-5">
              <BreadcrumbItem href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </BreadcrumbItem>
              <BreadcrumbItem href="/users/list">Users</BreadcrumbItem>
              <BreadcrumbItem>List</BreadcrumbItem>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              All users
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100 dark:divide-gray-700">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="users-search"
                    name="users-search"
                    placeholder="Search for users"
                  />
                </div>
              </form>
              <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                <Link
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Configure</span>
                  <HiCog className="text-2xl" />
                </Link>
                <Link
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Delete</span>
                  <HiTrash className="text-2xl" />
                </Link>
                <Link
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Purge</span>
                  <HiExclamationCircle className="text-2xl" />
                </Link>
                <Link
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Settings</span>
                  <HiDotsVertical className="text-2xl" />
                </Link>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <AddUserModal />
              <Button color="alternative">
                <div className="flex items-center gap-x-3">
                  <HiDocumentDownload className="text-xl" />
                  <span>Export</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <AllUsersTable usersList={usersList} />
            </div>
          </div>
        </div>
      </div>
      <Pagination usersList={usersList} />
    </>
  );
}

function AddUserModal() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="blue" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Add user
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} dismissible>
        <ModalHeader>Add new user</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <div>
                <TextInput
                  id="firstName"
                  name="firstName"
                  placeholder="Bonnie"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <div>
                <TextInput id="lastName" name="lastName" placeholder="Green" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <div>
                <TextInput
                  id="email"
                  name="email"
                  placeholder="example@company.com"
                  type="email"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div>
                <TextInput
                  id="phone"
                  name="phone"
                  placeholder="e.g. +(12)3456 789"
                  type="tel"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="department">Department</Label>
              <div>
                <TextInput
                  id="department"
                  name="department"
                  placeholder="Development"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="company">Company</Label>
              <div>
                <TextInput
                  id="company"
                  name="company"
                  placeholder="Somewhere"
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="blue" onClick={() => setOpen(false)}>
            Add user
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function AllUsersTable({ usersList }: UsersListPageData) {
  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <TableHead
        className="bg-gray-100 dark:bg-gray-700"
        theme={{
          cell: {
            base: "p-4 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400",
          },
        }}
      >
        <TableRow>
          <TableHeadCell className="rounded-none! p-4">
            <Label htmlFor="select-all" className="sr-only">
              Select all
            </Label>
            <Checkbox id="select-all" name="select-all" />
          </TableHeadCell>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Position</TableHeadCell>
          <TableHeadCell>Country</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell className="rounded-none!" />
        </TableRow>
      </TableHead>
      <TableBody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {usersList.map((user) => (
          <TableRow
            key={user.email}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <TableCell className="w-4 rounded-none! p-4">
              <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
            </TableCell>
            <TableCell className="mr-12 flex items-center space-x-6 p-4 whitespace-nowrap lg:mr-0">
              <Image
                alt=""
                height={40}
                src={user.avatar}
                width={40}
                className="rounded-full"
              />
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {user.email}
                </div>
              </div>
            </TableCell>
            <TableCell className="p-4 text-base font-medium whitespace-nowrap text-gray-900 dark:text-white">
              {user.position}
            </TableCell>
            <TableCell className="p-4 text-base font-medium whitespace-nowrap text-gray-900 dark:text-white">
              {user.country}
            </TableCell>
            <TableCell className="p-4 text-base font-normal whitespace-nowrap text-gray-900 dark:text-white">
              <div className="flex items-center">
                <div
                  className={twMerge(
                    "mr-2 h-2.5 w-2.5 rounded-full",
                    user.status === "Active" ? "bg-green-400" : "bg-red-500",
                  )}
                />
                {user.status}
              </div>
            </TableCell>
            <TableCell className="rounded-none!">
              <div className="flex items-center gap-x-3 whitespace-nowrap">
                <EditUserModal />
                <DeleteUserModal />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function EditUserModal() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" color="blue" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiPencilAlt className="h-5 w-5" />
          Edit user
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} dismissible>
        <ModalHeader>Edit user</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <div>
                <TextInput
                  id="firstName"
                  name="firstName"
                  placeholder="Bonnie"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <div>
                <TextInput id="lastName" name="lastName" placeholder="Green" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <div>
                <TextInput
                  id="email"
                  name="email"
                  placeholder="example@company.com"
                  type="email"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div>
                <TextInput
                  id="phone"
                  name="phone"
                  placeholder="e.g. +(12)3456 789"
                  type="tel"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="department">Department</Label>
              <div>
                <TextInput
                  id="department"
                  name="department"
                  placeholder="Development"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="company">Company</Label>
              <div>
                <TextInput
                  id="company"
                  name="company"
                  placeholder="Somewhere"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="passwordCurrent">Current Password</Label>
              <div>
                <TextInput
                  id="passwordCurrent"
                  name="passwordCurrent"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="passwordNew">New Password</Label>
              <div>
                <TextInput
                  id="passwordNew"
                  name="passwordNew"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="blue" onClick={() => setOpen(false)}>
            Save all
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function DeleteUserModal() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" color="red" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiTrash className="h-5 w-5" />
          Delete user
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md" dismissible>
        <ModalHeader className="border-none p-2">
          <span className="sr-only">Delete user</span>
        </ModalHeader>
        <ModalBody className="px-6 pt-0 pb-6">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="mx-auto h-20 w-20 text-red-600" />
            <p className="text-xl font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </p>
            <div className="flex items-center gap-x-3">
              <Button
                color="red"
                theme={{ base: "px-0" }}
                onClick={() => setOpen(false)}
              >
                <span className="text-base font-medium">Yes, I'm sure</span>
              </Button>
              <Button
                color="alternative"
                theme={{ base: "px-0" }}
                onClick={() => setOpen(false)}
              >
                <span className="text-base font-medium">No, cancel</span>
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

function Pagination({ usersList }: UsersListPageData) {
  const [page, setPage] = useState(0);
  const numEntriesPerPage = Math.min(20, usersList.length);
  const numPages = Math.floor(usersList.length / numEntriesPerPage);

  const previousPage = () => {
    setPage(page > 0 ? page - 1 : page);
  };

  const nextPage = () => {
    setPage(page < numPages - 1 ? page + 1 : page);
  };

  return (
    <div className="sticky right-0 bottom-0 w-full items-center border-t border-gray-200 bg-white p-4 sm:flex sm:justify-between dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center sm:mb-0">
        <button
          onClick={previousPage}
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Previous page</span>
          <HiChevronLeft className="h-7 w-7" />
        </button>
        <button
          onClick={nextPage}
          className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Next page</span>
          <HiChevronRight className="h-7 w-7" />
        </button>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {page * usersList.length + 1}-
            {numEntriesPerPage * page + numEntriesPerPage}
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {usersList.length}
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <Link
          href="#"
          className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-medium text-white focus:ring-4"
        >
          <HiChevronLeft className="mr-1 -ml-1 h-5 w-5" />
          Previous
        </Link>
        <Link
          href="#"
          className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-medium text-white focus:ring-4"
        >
          Next
          <HiChevronRight className="-mr-1 ml-1 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}

export default UsersListPageContent;
