'use server';

import { createAdminClient } from '@/lib/appwrite';
import { ID } from 'node-appwrite';

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_PRE_REGISTER_COLLECTION_ID: PRE_REGISTER_COLLECTION_ID,
} = process.env;

if (!DATABASE_ID || !PRE_REGISTER_COLLECTION_ID) throw new Error('Missing Appwrite env vars');

type CreatePreRegisterProps = {
  email: string;
  signUpDate: number;
  newsletter: boolean;
};

export const createPreRegister = async ({
  email,
  signUpDate,
  newsletter,
}: CreatePreRegisterProps): Promise<{
  message: string;
  success: boolean;
}> => {
  try {
    const { database } = await createAdminClient();

    await database.createDocument(DATABASE_ID, PRE_REGISTER_COLLECTION_ID, ID.unique(), {
      email,
      signUpDate,
      newsletter,
    });

    return {
      message: 'Thank you for your interest in our waitlist!',
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: 'Failed to create pre-register',
      success: false,
    };
  }
};
