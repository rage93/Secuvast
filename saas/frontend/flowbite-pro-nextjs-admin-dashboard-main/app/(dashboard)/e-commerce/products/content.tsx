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
  Textarea,
  TextInput,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlineUpload,
  HiPencilAlt,
  HiTrash,
} from "react-icons/hi";
import type { ECommerceProductsPageData } from "./page";

function ECommerceProductsPageContent({ products }: ECommerceProductsPageData) {
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
              <BreadcrumbItem href="/e-commerce/products">
                E-commerce
              </BreadcrumbItem>
              <BreadcrumbItem>Products</BreadcrumbItem>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              All products
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <SearchForProducts />
            <div className="hidden space-x-1 border-l border-gray-100 pl-2 md:flex dark:border-gray-700">
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
            <div className="flex w-full items-center sm:justify-end">
              <AddProductModal />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <ProductsTable products={products} />
            </div>
          </div>
        </div>
      </div>
      <TableNavigation />
    </>
  );
}

function SearchForProducts() {
  return (
    <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
      <Label htmlFor="products-search" className="sr-only">
        Search
      </Label>
      <div className="relative mt-1 sm:w-64 xl:w-96">
        <TextInput
          id="products-search"
          name="products-search"
          placeholder="Search for products"
        />
      </div>
    </form>
  );
}

function AddProductModal() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="blue" onClick={() => setOpen(!isOpen)}>
        <FaPlus className="mr-3 text-sm" />
        Add product
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} dismissible>
        <ModalHeader className="border-b border-gray-200 dark:border-gray-700">
          Add product
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="productName">Product Name</Label>
                <TextInput
                  id="productName"
                  name="productName"
                  placeholder='Apple iMac 27"'
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <TextInput
                  id="category"
                  name="category"
                  placeholder="Electronics"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="brand">Brand</Label>
                <TextInput id="brand" name="brand" placeholder="Apple" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  name="price"
                  type="number"
                  placeholder="$2300"
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="producTable.Celletails">Product Details</Label>
                <Textarea
                  id="producTable.Celletails"
                  name="producTable.Celletails"
                  placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                  rows={6}
                />
              </div>
            </div>
            <div className="mt-4 flex w-full items-center justify-center">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <HiOutlineUpload className="h-10 w-10 text-gray-400" />
                  <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                    Upload a file or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="blue" onClick={() => setOpen(false)}>
            Add product
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function EditProductModal() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" color="blue" onClick={() => setOpen(!isOpen)}>
        <HiPencilAlt className="mr-2 h-5 w-5" />
        Edit item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} dismissible>
        <ModalHeader>Edit product</ModalHeader>
        <ModalBody>
          <form>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="productName">Product Name</Label>
                <TextInput
                  id="productName"
                  name="productName"
                  placeholder='Apple iMac 27"'
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <TextInput
                  id="category"
                  name="category"
                  placeholder="Electronics"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="brand">Brand</Label>
                <TextInput id="brand" name="brand" placeholder="Apple" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  name="price"
                  type="number"
                  placeholder="$2300"
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="productDetails">Product Details</Label>
                <Textarea
                  id="productDetails"
                  name="productDetails"
                  placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                  rows={6}
                />
              </div>
            </div>
            <div className="my-4 flex space-x-5">
              <div>
                <Image
                  className="h-24 w-24 min-w-24"
                  alt="Apple iMac 1"
                  height={96}
                  src="/images/products/apple-imac-1.png"
                  width={96}
                />
                <Link href="#" className="cursor-pointer">
                  <span className="sr-only">Delete</span>
                  <HiTrash className="-mt-5 text-2xl text-red-600" />
                </Link>
              </div>
              <div>
                <Image
                  className="h-24 w-24 min-w-24"
                  alt="Apple iMac 2"
                  height={96}
                  src="/images/products/apple-imac-2.png"
                  width={96}
                />
                <Link href="#" className="cursor-pointer">
                  <span className="sr-only">Delete</span>
                  <HiTrash className="-mt-5 text-2xl text-red-600" />
                </Link>
              </div>
              <div>
                <Image
                  className="h-24 w-24 min-w-24"
                  alt="Apple iMac 3"
                  height={96}
                  src="/images/products/apple-imac-3.png"
                  width={96}
                />
                <Link href="#" className="cursor-pointer">
                  <span className="sr-only">Delete</span>
                  <HiTrash className="-mt-5 text-2xl text-red-600" />
                </Link>
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <HiOutlineUpload className="h-10 w-10 text-gray-400" />
                  <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                    Upload a file or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </form>
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

function DeleteProductModal() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        color="red"
        // className="bg-red-700!"
        onClick={() => setOpen(!isOpen)}
      >
        <HiTrash className="mr-2 h-5 w-5" />
        Delete item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md" dismissible>
        <ModalHeader className="border-none p-2">
          <span className="sr-only">Delete product</span>
        </ModalHeader>
        <ModalBody className="px-6 pt-0 pb-6">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="mx-auto h-20 w-20 text-red-600" />
            <p className="text-xl font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
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

function ProductsTable({ products }: ECommerceProductsPageData) {
  return (
    <Table
      className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
      theme={{
        head: {
          base: "bg-gray-100 dark:bg-gray-700",
          cell: {
            base: "p-4 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400",
          },
        },
        body: {
          cell: {
            base: "rounded-none",
          },
        },
      }}
    >
      <TableHead className="bg-gray-100 dark:bg-gray-700">
        <TableRow>
          <TableHeadCell className="rounded-none!">
            <span className="sr-only">Toggle selected</span>
            <Checkbox />
          </TableHeadCell>
          <TableHeadCell>Product Name</TableHeadCell>
          <TableHeadCell>Technology</TableHeadCell>
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Price</TableHeadCell>
          <TableHeadCell className="rounded-none!">Actions</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {products.map(({ id, name, category, technology, price }) => (
          <TableRow
            key={id}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <TableCell className="w-4 rounded-none! p-4">
              <Checkbox />
            </TableCell>
            <TableCell className="p-4 text-sm font-normal whitespace-nowrap text-gray-500 dark:text-gray-400">
              <div className="text-base font-semibold text-gray-900 dark:text-white">
                {name}
              </div>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {category}
              </div>
            </TableCell>
            <TableCell className="p-4 text-base font-medium whitespace-nowrap text-gray-900 dark:text-white">
              {technology}
            </TableCell>
            <TableCell className="p-4 text-base font-medium whitespace-nowrap text-gray-900 dark:text-white">
              #{id}
            </TableCell>
            <TableCell className="p-4 text-base font-medium whitespace-nowrap text-gray-900 dark:text-white">
              ${price}
            </TableCell>
            <TableCell className="space-x-2 rounded-none! p-4 whitespace-nowrap">
              <div className="flex items-center gap-x-3">
                <EditProductModal />
                <DeleteProductModal />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function TableNavigation() {
  return (
    <div className="sticky right-0 bottom-0 w-full items-center border-t border-gray-200 bg-white p-4 sm:flex sm:justify-between dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center sm:mb-0">
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <HiChevronLeft className="h-7 w-7" />
        </a>
        <a
          href="#"
          className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <HiChevronRight className="h-7 w-7" />
        </a>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1-20
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            2290
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <Button color="blue" size="sm" href="#">
          <HiChevronLeft className="mr-1 -ml-1 h-5 w-5" />
          Previous
        </Button>
        <Button color="blue" size="sm" href="#">
          Next
          <HiChevronRight className="-mr-1 ml-1 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default ECommerceProductsPageContent;
