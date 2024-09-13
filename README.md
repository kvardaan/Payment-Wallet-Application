# Payment Wallet Application

A wallet built to handle transactions between people and businesses built with Next.js, Turborepo, Prisma ORM, and Docker deployed on an EC2 machine with CI/CD enabling seamless operations.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)

## Features

- Auth using Clerk
- User Application
   - Manage bank account(s)
   - Adding money to the wallet (on-ramp transactions) from bank account(s) via a webhook
   - Transfer money via username to other users/ businesses (merchants)
- Merchant Application
   - Manage bank account
   - Settle batch (off-ramp money to bank) manually or automatically (scheduled job every mid-night)
- Dockerized applications for easy deployment
- CI/CD pipeline for automated deployment

## Technologies Used

- Turborepo
- Next.js
- Express.js
- Clerk
- Zustand
- Tailwind CSS
- Shadcn UI
- ESLint
- Prisma ORM
- PostgreSQL
- Docker
- GitHub Actions (CI/CD)
- AWS EC2

## Architecture

The application has two major sides -
- User Application
   ![User Application Architecture](/assets/user-application.png)
- Merchant Application
   ![Merchant Application Architecture](/assets/merchant-application.png)

## CI/CD Pipeline

This project uses GitHub Actions for CI/CD. The pipeline -

1. Runs build tests on every push and pull request
2. Builds Docker images for different sub-applications
3. Deploys to EC2 on successful builds of the main branch

## Deployment

The application is deployed to an AWS EC2 through the CI/CD pipeline using GitHub Actions.

Additional Resources
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Prisma ORM Documentation](https://www.prisma.io/docs/orm)
- [Zustand Documentation](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation)

> [!NOTE]  
> Suggestions are welcomed for additional improvements to the existing structure. If you have ideas for enhancing the functionality or user experience, please feel free to open an issue or submit a pull request.