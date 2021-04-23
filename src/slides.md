# Code Conversation

### 2021/4/9 Fri.

---

```plantuml
@startuml
Bob1 -> Alice : hello
@enduml
```

```plantuml
@startuml
Bob2 -> Alice : hello
@enduml
```

```plantuml
@startuml
participant participant as Foo
actor       actor       as Foo1
boundary    boundary    as Foo2
control     control     as Foo3
entity      entity      as Foo4
database    database    as Foo5
collections collections as Foo6
queue       queue       as Foo7
Foo -> Foo1 : To actor
Foo -> Foo2 : To boundary
Foo -> Foo3 : To control
Foo -> Foo4 : To entity
Foo -> Foo5 : To database
Foo -> Foo6 : To collections
Foo -> Foo7: To queue
@enduml
```

---

### サンプル見出し 〇〇な実装

概要説明

- ｘｘｘよりもｙｙｙ
- ｘｘｘよりもｙｙｙｓｓｓ
- ｘｘｘよりもｙｙｙえええっうぇｗｗ

```js
const func = () => {
  console.log("Hello World");
};

import React from "react";

export default function ProductRow(props) {
  const { categorizedProduct, keyword, isShowOnlyInStock } = props;
  const { name, price, stocked } = categorizedProduct;

  const isMatchedKeyword = !keyword || name.includes(keyword);
  const isShow = (stocked || !isShowOnlyInStock) && isMatchedKeyword;

  return (
    isShow && (
      <tr>
        <td style={stocked ? {} : { color: "red" }}>{name}</td>
        <td>{price}</td>
      </tr>
    )
  );
}

import React from "react";

export default function ProductRow(props) {
  const { categorizedProduct, keyword, isShowOnlyInStock } = props;
  const { name, price, stocked } = categorizedProduct;

  const isMatchedKeyword = !keyword || name.includes(keyword);
  const isShow = (stocked || !isShowOnlyInStock) && isMatchedKeyword;

  return (
    isShow && (
      <tr>
        <td style={stocked ? {} : { color: "red" }}>{name}</td>
        <td>{price}</td>
      </tr>
    )
  );
}

import React from "react";

export default function ProductRow(props) {
  const { categorizedProduct, keyword, isShowOnlyInStock } = props;
  const { name, price, stocked } = categorizedProduct;

  const isMatchedKeyword = !keyword || name.includes(keyword);
  const isShow = (stocked || !isShowOnlyInStock) && isMatchedKeyword;

  return (
    isShow && (
      <tr>
        <td style={stocked ? {} : { color: "red" }}>{name}</td>
        <td>{price}</td>
      </tr>
    )
  );
}

import React from "react";

export default function ProductRow(props) {
  const { categorizedProduct, keyword, isShowOnlyInStock } = props;
  const { name, price, stocked } = categorizedProduct;

  const isMatchedKeyword = !keyword || name.includes(keyword);
  const isShow = (stocked || !isShowOnlyInStock) && isMatchedKeyword;

  return (
    isShow && (
      <tr>
        <td style={stocked ? {} : { color: "red" }}>{name}</td>
        <td>{price}</td>
      </tr>
    )
  );
}

import React from "react";

export default function ProductRow(props) {
  const { categorizedProduct, keyword, isShowOnlyInStock } = props;
  const { name, price, stocked } = categorizedProduct;

  const isMatchedKeyword = !keyword || name.includes(keyword);
  const isShow = (stocked || !isShowOnlyInStock) && isMatchedKeyword;

  return (
    isShow && (
      <tr>
        <td style={stocked ? {} : { color: "red" }}>{name}</td>
        <td>{price}</td>
      </tr>
    )
  );
}
```

---

Sub Bar

.slide: data-background="./IMGP7926.jpg"

<div>
<img src="./IMGP7926.jpg"/ >
</div>

---

The End.
