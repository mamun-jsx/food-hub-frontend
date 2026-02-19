import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
    console.log("id ---> ", id)
  return (
    <div>
      <h2>Hello product details page is here</h2>
      <h1>Slug: {id}</h1>
    </div>
  );
};

export default page;
