// Sidebar Start 
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    try {
      /* ============================================================
         1. Retrieve User Information from K2
      ============================================================ */
      const fqn = SourceCode?.Forms?.Settings?.User?.FQN || "";
      const userName = fqn ? fqn.split("\\").pop() : "User";

      const departmentEl = document.querySelector("[name*='User_Department_DataLabel']");
      const department = departmentEl ? departmentEl.textContent.trim() : "Unknown Department";

      /* ============================================================
         2. Sidebar Configuration
      ============================================================ */
      const sidebarConfig = [
        {
          category: "Main Links",
          links: [
            {
              icon: "/Runtime/Styles/Style%20profile/images/net/Human Capital Excellence.svg",
              name: "Dashboard",
              url: "/Runtime/Runtime/Form/NR__MarketingRequest__Form/"
            },
            {
              icon: "/Runtime/Styles/Style%20profile/images/net/Dashboard.svg",
              name: "My Recent Submission",
              url: "/Runtime/Runtime/Form/MainDashboard"
            },
          ]
        },
        {
          category: "Services",
          links: [
            {
              icon: "/Runtime/Styles/Style%20profile/images/net/Human Capital Excellence.svg",
              name: "Finance",
              url: "#"
            },
            {
              icon: "/Runtime/Styles/Style%20profile/images/net/Dashboard.svg",
              name: "Pre - Qualification",
              url: "#"
            },
            {
              icon: "/Runtime/Styles/Style%20profile/images/net/Dashboard.svg",
              name: "HR - General",
              url: "#"
            },
            {
              icon: "/Runtime/Styles/Style%20profile/images/net/Dashboard.svg",
              name: "HR - Training",
              url: "#"
            },
            {
              icon: "/Runtime/Styles/DAEP/images/sidebar/HSSE - General.svg",
              name: "HSSE - General",
              url: "#"
            },
            {
              icon: "/Runtime/Styles/DAEP/images/sidebar/HSSE - Airside.svg",
              name: "HSSE - Airside",
              url: "#"
            },
            {
              icon: "/Runtime/Styles/DAEP/images/sidebar/HSSE - Landslide.svg",
              name: "HSSE - Landslide",
              url: "#"
            },
            {
              icon: "/Runtime/Styles/DAEP/images/sidebar/Knowledge Management.svg",
              name: "Knowledge Management",
              url: "#"
            },
            {
              icon: "/Runtime/Styles/DAEP/images/sidebar/E-Services.svg",
              name: "E-Services",
              url: "#"
            },
          ]
        }
      ];

      /* ============================================================
         3. Build Sidebar HTML
      ============================================================ */
      document.body.insertAdjacentHTML("beforeend", `
        <aside class="sidebar">
          <div class="userSettings d-flex align-items-center">
            <div class="userProfile d-none d-lg-flex align-items-center">
              <div class="userProfilePhoto">
                <img src="/Runtime/Styles/Style%20profile/images/net/Userthumb.png" alt="${userName}" class="profilePhoto"/>
              </div>
              <div class="userInformations d-flex flex-column">
                <span class="username">${userName}</span>
                <span class="userPosition">${department}</span>
              </div>
            </div>

            <button class="notifications" data-bs-toggle="modal" data-bs-target="#notificationModal">
              <img src="/Runtime/Styles/Style%20profile/images/net/Notification.svg"/>
            </button>
          </div>

          <div class="sideBarLinksGroup"></div>

          <div class="toggle-container">
            <span class="toggle-label">Light Mode</span>
            <label class="switch">
              <input type="checkbox" id="modeToggle">
              <span class="slider">
                <span class="icon">
                  <img class="sun-img" src="/Runtime/Styles/Style%20profile/images/net/Sun.svg" alt="">
                </span>
              </span>
            </label>
          </div>
        </aside>

        <div class="overlayShadow" style="display:none;"></div>

        <aside class="subPanel">
          <div class="closeSubpanel">X</div>
          <div class="subPanelHeader"><h5 class="subSectionTitle"></h5></div>
          <div class="subPanelBody"><ul></ul></div>
        </aside>

        <!-- USER PROFILE MODAL -->
        <div class="modal user-modal" id="userModal">
          <div class="modal-dialog modal-dialog-end">
            <div class="modal-content">
              <div class="modal-header">
                <div class="user-modal-header">
                  <img src="/Runtime/Styles/Style%20profile/images/net/UserProfile.png" alt="">
                  <div class="name-email">
                    <p class="userNAME">${userName}</p>
                    <p class="user-mail"></p>
                  </div>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div class="modal-body">
                <div class="user-settings">
                  <div class="button buttonstyle-primary sign-out" id="LogoutLink" onclick="CustomK2Logout()">
                    <img src="/Runtime/Styles/Style%20profile/images/net/Sign Out.svg" alt="sign-out">
                    Sign Out
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      `);

      /* ============================================================
         4. Render Sidebar Links
      ============================================================ */
      const sidebarContainer = document.querySelector(".sideBarLinksGroup");
      const currentPath = window.location.pathname;

      sidebarConfig.forEach(section => {
        const category = document.createElement("div");
        category.classList.add("sidebarCategory");

        const title = document.createElement("h6");
        title.classList.add("categoryName");
        title.textContent = section.category;
        category.appendChild(title);

        const ul = document.createElement("ul");
        ul.classList.add("links");

        section.links.forEach(link => {
          const li = document.createElement("li");
          li.classList.add(link.children ? "isSubMenu" : "noSubChildren");

          // Mark active page
          if (link.url && currentPath === new URL(link.url, window.location.origin).pathname) {
            li.classList.add("active");
          }

          li.innerHTML = `
            <div class="icon"><img src="${link.icon}" alt=""></div>
            <a href="${link.url || '#'}">${link.name}</a>
          `;

          const anchor = li.querySelector("a");

          // Disable invalid links
          if (!link.url || link.url === "#") {
            anchor.classList.add("disabled");
            anchor.setAttribute("tabindex", "-1");
            anchor.setAttribute("aria-disabled", "true");
          }

          // Prevent click on disabled links
          anchor.addEventListener("click", e => {
            if (anchor.classList.contains("disabled")) {
              e.preventDefault();
              e.stopPropagation();
            }
          });

          ul.appendChild(li);
        });

        category.appendChild(ul);
        sidebarContainer.appendChild(category);
      });

      /* ============================================================
         5. Submenu (Side Panel) Logic
      ============================================================ */
      const subPanel = document.querySelector(".subPanel");
      const subPanelList = subPanel.querySelector(".subPanelBody ul");
      const subPanelTitle = subPanel.querySelector(".subSectionTitle");
      const overlayShadow = document.querySelector(".overlayShadow");
      const closeSubpanelBtn = subPanel.querySelector(".closeSubpanel");

      const updateOverlay = () => {
        overlayShadow.style.display = subPanel.classList.contains("active") ? "block" : "none";
      };

      document.querySelectorAll(".isSubMenu").forEach(menu => {
        menu.addEventListener("click", e => {
          e.preventDefault();

          const title = menu.querySelector("a").innerText.trim();
          let menuConfig = null;

          sidebarConfig.forEach(section => {
            section.links.forEach(l => {
              if (l.name === title) menuConfig = l;
            });
          });

          if (!menuConfig?.children?.length) {
            subPanel.classList.remove("active");
            updateOverlay();
            return;
          }

          subPanelTitle.textContent = title;
          subPanelList.innerHTML = "";

          menuConfig.children.forEach(child => {
            const li = document.createElement("li");
            li.innerHTML = `
              <div class="icon"><img src="${child.icon}" alt=""></div>
              <a href="${child.url}">${child.name}</a>
            `;
            subPanelList.appendChild(li);
          });

          subPanel.classList.add("active");
          updateOverlay();
        });
      });

      closeSubpanelBtn.addEventListener("click", () => {
        subPanel.classList.remove("active");
        updateOverlay();
      });

    } catch (err) {
      console.error("Error rendering sidebar:", err);
    }
  }, 1000);
});

// Sidebar End 

//  SIDEBAR SUBMENU SCRIPT (SAFE)
// document.addEventListener("DOMContentLoaded", () => {
//   // 🕐 Wait until .subPanel exists (in case it's loaded dynamically)
//   function waitForSubPanel() {
//     const subPanel = document.querySelector(".subPanel");
//     if (!subPanel) {
//       requestAnimationFrame(waitForSubPanel); // Try again next frame
//       return;
//     }

//     initSubMenu(subPanel);
//   }

//   waitForSubPanel();

//   function initSubMenu(subPanel) {
//     // ================================
//     // ELEMENT REFERENCES
//     // ================================
//     const subMenus = document.querySelectorAll(".isSubMenu");
//     const subPanelList = subPanel.querySelector(".subPanelBody ul");
//     const subPanelTitle = subPanel.querySelector(".subPanelHeader .subSectionTitle");
//     const overlayShadow = document.querySelector(".overlayShadow");
//     const closeSubpanelBtn = subPanel.querySelector(".closeSubpanel");

//     // ================================
//     // MENU LINK DEFINITIONS
//     // ================================
//     const submenuLinks = {
//       "Reports & Analytics": [
//         { icon: "/Runtime/Styles/Style%20profile/images/net/sada 1.svg", text: "Marketing Dashboard", url: "#" },
//         { icon: "/Runtime/Styles/Style%20profile/images/net/sada 1.svg", text: "Communication Dashboard", url: "#" },
//         { icon: "/Runtime/Styles/Style%20profile/images/net/sada 1.svg", text: "Information Technology Dashboard", url: "#" }
//       ],
//       "Retail & Digital Banking": [
//         { icon: "/Runtime/Styles/Style%20profile/images/net/sada 1.svg", text: "Branch Reports", url: "#" },
//         { icon: "/Runtime/Styles/Style%20profile/images/net/sada 1.svg", text: "Customer Insights", url: "#" }
//       ],
//       "Marketing & Corporate": [
//         { icon: "/Runtime/Styles/Style%20profile/images/net/sada 1.svg", text: "Campaign Performance", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/NR__MarketingRequest__Form/" }
//       ],
//       "Shariah": [],
//       "Information Technology": [],
//       "Operations": [],
//       "Facilities Management": [],
//       "Human Capital": [],
//       "Risk Management": []
//     };

//     // ================================
//     // RENDER SUBLINKS
//     // ================================
//     function renderSubLinks(title) {
//       subPanelList.innerHTML = ""; // Clear old links

//       if (submenuLinks[title] && submenuLinks[title].length > 0) {
//         submenuLinks[title].forEach(link => {
//           const li = document.createElement("li");
//           li.innerHTML = `
//             <div class="icon">
//               <img src="${link.icon}" alt="">
//             </div>
//             <a href="${link.url}" target="_blank">${link.text}</a>
//           `;
//           subPanelList.appendChild(li);
//         });
//         return true;
//       }
//       return false;
//     }

//     // ================================
//     // OVERLAY CONTROL
//     // ================================
//     function updateOverlay() {
//       const hasActivePanel = document.querySelector(".subPanel.active");
//       if (overlayShadow) {
//         overlayShadow.style.display = hasActivePanel ? "block" : "none";
//       }
//     }

//     // ================================
//     // MENU CLICK HANDLING
//     // ================================
//     subMenus.forEach(menu => {
//       menu.addEventListener("click", e => {
//         e.preventDefault();
//         const title = menu.querySelector("a").innerText.trim();

//         // If no submenu items → close the panel
//         if (!submenuLinks[title] || submenuLinks[title].length === 0) {
//           subPanel.classList.remove("active");
//           updateOverlay();
//           return;
//         }

//         // Update panel title
//         subPanelTitle.textContent = title;

//         // Toggle animation (1s delay for transition)
//         if (subPanel.classList.contains("active")) {
//           subPanel.classList.remove("active");
//           setTimeout(() => {
//             renderSubLinks(title);
//             subPanel.classList.add("active");
//             updateOverlay();
//           }, 1000);
//         } else {
//           renderSubLinks(title);
//           subPanel.classList.add("active");
//           updateOverlay();
//         }
//       });
//     });

//     // ================================
//     // CLOSE SUBPANEL BUTTON
//     // ================================
//     if (closeSubpanelBtn) {
//       closeSubpanelBtn.addEventListener("click", () => {
//         subPanel.classList.remove("active");
//         updateOverlay();
//       });
//     }

//     // ================================
//     // OVERLAY CLICK CLOSE BEHAVIOR
//     // ================================
//     if (overlayShadow) {
//       overlayShadow.addEventListener("click", () => {
//         subPanel.classList.remove("active");
//         updateOverlay();
//       });
//     }
//   }
// });