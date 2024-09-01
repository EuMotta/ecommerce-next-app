'use client';

import Link from 'next/link';

import Container from '@/components/common/container';
export default function Home() {
  return (
    <main>
      <Container className="bg-light-primary flex min-h-[90vh] flex-col justify-between p-10">
        <div className="flex justify-evenly">
          <Link href="https://github.com/EuMotta" target="_blank">
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/jos%C3%A9-antonio-bueno-motta-61006a26b/"
            target="_blank"
          >
            LinkedIn
          </Link>
        </div>
      </Container>
    </main>
  );
}
