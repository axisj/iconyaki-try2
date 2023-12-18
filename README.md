This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# ICONYAKI

### iconyaki: Elevating Icon Transformation Experience for Frontend Developers

![iconyaki.png](docs%2Ficonyaki.png)

Introducing 'iconyaki,' a tool designed to provide frontend developers with the optimal icon transformation experience. 'iconyaki' offers a seamless and diverse range of icon conversion functionalities to quickly integrate visual elements into your projects.

## How to Use iconyaki


### 1. Install development dependencies & run the development server
```shell
npm install
npm run dev
```

### 2. Enter the Project Name & Icon Prefix Name
Click the 'Config' button at the page header to enter the project name and icon prefix name.

### 3. Upload your SVG file
Click the 'Upload' button at the page header to upload your SVG file. 
and check the 'Icon List' section to see the list of icons you uploaded.
finally, click the 'Generate' button to generate the icon files.

### 4. Use the generated icon files
You can see the index page to see the generated icon files.

## Usage Icon Files
```typescript
import { IconBin } from "@/components/icon";

const IconBinExample = () => {
  return (
    <div>
      <IconBin />
    </div>
  );
};
```
