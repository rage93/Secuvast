"use client";

import { Footer, FooterLink, FooterLinkGroup } from "flowbite-react";
import { FaDribbble, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";

function DashboardFooter() {
  return (
    <div className="mx-4 my-6">
      <Footer className="p-4 md:p-6 xl:p-8" container>
        <div className="flex w-full flex-col gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
          <FooterLinkGroup>
            <FooterLink
              href="#"
              className="mr-3 mb-3 text-gray-500 lg:mb-0 dark:text-gray-400"
            >
              Terms and conditions
            </FooterLink>
            <FooterLink
              href="#"
              className="mr-3 mb-3 text-gray-500 lg:mb-0 dark:text-gray-400"
            >
              Privacy Policy
            </FooterLink>
            <FooterLink
              href="#"
              className="mr-3 text-gray-500 dark:text-gray-400"
            >
              Licensing
            </FooterLink>
            <FooterLink
              href="#"
              className="mr-3 text-gray-500 dark:text-gray-400"
            >
              Cookie Policy
            </FooterLink>
            <FooterLink href="#" className="text-gray-500 dark:text-gray-400">
              Contact
            </FooterLink>
          </FooterLinkGroup>
          <FooterLinkGroup className="flex-nowrap gap-6 sm:justify-center">
            <FooterLink
              href="#"
              className="m-0 text-gray-500 hover:text-gray-900 md:m-0 dark:text-gray-400 dark:hover:text-white"
            >
              <MdFacebook className="h-5 w-5" />
            </FooterLink>
            <FooterLink
              href="#"
              className="m-0 text-gray-500 hover:text-gray-900 md:m-0 dark:text-gray-400 dark:hover:text-white"
            >
              <FaInstagram className="h-5 w-5" />
            </FooterLink>
            <FooterLink
              href="#"
              className="m-0 text-gray-500 hover:text-gray-900 md:m-0 dark:text-gray-400 dark:hover:text-white"
            >
              <FaTwitter className="h-5 w-5" />
            </FooterLink>
            <FooterLink
              href="#"
              className="m-0 text-gray-500 hover:text-gray-900 md:m-0 dark:text-gray-400 dark:hover:text-white"
            >
              <FaGithub className="h-5 w-5" />
            </FooterLink>
            <FooterLink
              href="#"
              className="m-0 text-gray-500 hover:text-gray-900 md:m-0 dark:text-gray-400 dark:hover:text-white"
            >
              <FaDribbble className="h-5 w-5" />
            </FooterLink>
          </FooterLinkGroup>
        </div>
      </Footer>
      <p className="my-10 text-center text-sm text-gray-500">
        &copy; 2019-{new Date().getFullYear()}{" "}
        <a
          href="https://flowbite.com/"
          className="hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Flowbite.com
        </a>
        . All rights reserved.
      </p>
    </div>
  );
}

export default DashboardFooter;
