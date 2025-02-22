# Đóng góp xây dựng ứng dụng Lesson Planner

React Router là "framework" chính của ứng dụng Lesson Planner. Mình nói một chút về cấu trúc ứng dụng nhé.

## Cấu trúc ứng dụng

Các chức năng chính mình để hết vào folder [`/app/features`](/app/features/) rồi:

```
├── app/contexts/LessonContext
│   ├── actions            # giao tiếp với indexeddb
├── app/features
│   ├── step-display/steps # 3 bước kể trên
│   │   ├── one/
│   │   ├── two/
│   │   └── three/
```

Để giao tiếp với IndexedDB, bạn tìm hiểu thư viện [`Dexie`](https://dexie.org/docs/Tutorial/React) nhé.

Để đóng góp xây dựng, bạn có thể:

## Đóng góp mã nguồn

Đầu tiên, bạn `fork` repo này rồi `clone` bản fork của bạn về máy tính:

```sh
git clone https://github.com/YOUR-USERNAME/lesson-planner
```

rồi tạo một `branch` mới:

```sh
git branch BRANCH-NAME
git checkout BRANCH-NAME
```

Khi làm việc với mã nguồn, cài đặt các framework/thư viện với lệnh:

```sh
yarn install
```

Chạy `server local` với lệnh:

```sh
yarn dev
```

Sau khi chỉnh sửa mã nguồn, bạn chạy các lệnh sau để `build` ứng dụng:

```sh
yarn build
```

và xem trước bản build:

```sh
yarn start
```

Khi bản xem trước không còn bug, bạn `push` lên bản fork của mình và tạo một `pull request` lên repo này nhé.
