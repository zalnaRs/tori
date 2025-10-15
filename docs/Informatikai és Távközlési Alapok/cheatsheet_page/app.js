const data = [
  {
    type: "section",
    title: "User EXEC Mód",
    style: "background: oklch(0.8086 0.1953 121.76)",
    children: [
      {
        type: "command",
        command: "enable",
        help: "Átlépés a privileged EXEC módba.",
      },
      {
        type: "section",
        title: "Privileged EXEC Mód",
        style: "background: rgb(255, 40, 93);",
        children: [
          {
            type: "command",
            command: "disable",
            help: "Visszalépés a User EXEC módba.",
          },
          {
            type: "command",
            command: "show",
            help: "Információk lekérése",
            children: [
              {
                type: "command",
                command: "running-config",
                help: "Futó konfiguráció megtekintése.",
              },
              {
                type: "command",
                command: "ip interface brief",
                help: "Interfészek állapotának rövid listája.",
              },
            ],
          },
          {
            type: "command",
            command: "conf t",
            help: "Átlépés a globális konfigurációs szintbe.",
          },
          {
            type: "section",
            title: "Global config",
            style: "background: oklch(0.7411 0.2339 139.24)",
            children: [
              {
                type: "command",
                command: "service password-encryption",
                help: "A jelszavak titkosítása a konfigurációban.",
              },
              {
                type: "command",
                command: "enable secret <jelszó>",
                help: "enable biztonsági jelszó beállítása.",
              },

              {
                type: "command",
                command: "ip default-gateway 192.168.1.1",
                help: "Az alapértelmezett átjáró konfigurálása.",
              },

              { type: "command", command: "", help: "<br>" },

              {
                type: "command",
                command: "interface GigabitEthernet0/0",
                help: "Interfész konfigurálása (példa).",
              },
              {
                type: "command",
                command: "line vty 0 15",
                help: "Távoli (telnet/SSH) vonalak konfigurálása.",
              },
              {
                type: "command",
                command: "line console 0",
                help: "A konzolvonal konfigurációs mód megnyitása.",
              },

              {
                type: "section",
                title: "Konzolok",
                style: "background: oklch(0.705 0.2339 180)",
                children: [
                  {
                    type: "command",
                    command: "password <jelszó>",
                    help: "Jelszó beállítása a konzolhoz.",
                  },
                  {
                    type: "command",
                    command: "login",
                    help: "Belépéshez jelszó kérése engedélyezése.",
                  },
                ],
              },

              {
                type: "section",
                title: "Interfaces",
                style: "background: oklch(0.705 0.2339 90)",
                children: [
                  {
                    type: "command",
                    command: "ip address 192.168.1.1 255.255.255.0",
                    help: "IP cím és maszk beállítása az interfészen.",
                  },
                  {
                    type: "command",
                    command: "no shutdown",
                    help: "Az interfész engedélyezése.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const handleRender = (parent, element) => {
  let el;
  if (element.type == "section") {
    el = document.createElement("section");

    el.innerHTML = ` <h1>${element.title}</h1> <ul> </ul> `;
    el.style = element.style;

    for (const child of element.children) {
      const children = handleRender(null, child);
      el.querySelector("ul").append(children);
    }
  } else if (element.type == "command") {
    el = document.createElement("li");
    el.className = "command";
    el.innerHTML = `<code >${element.command}</code><span>${element.help}</span>`;

    if (element.children) {
      el.style.flexDirection = "column";
      el.style.alignItems = "initial";

      el.innerHTML = `<div style="display:flex;align-items:center;gap:8px;"><code >${element.command}</code><span>${element.help}</span></div>`;
      el.innerHTML += "<ul></ul>";
      for (const child of element.children) {
        const children = handleRender(null, child);
        el.querySelector("ul").append(children);
      }
    }
  }

  if (parent == null) {
    return el;
  } else {
    parent.append(el);
  }
};

window.onload = () => {
  const main = document.querySelector("main");
  for (const element of data) {
    handleRender(main, element);
  }

  for (const el of document.querySelectorAll("code")) {
   el.addEventListener('click', (e) => {
      navigator.clipboard.writeText(e.target.innerText)
    }) 
  }
};
