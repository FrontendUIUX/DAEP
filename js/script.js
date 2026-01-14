document.addEventListener('DOMContentLoaded', function () {
    const isEditForm = window.location.pathname.includes('EditForm');

    if (isEditForm) {
        const form = document.querySelector('.form');

        if (form) {
            form.classList.add('editingForm');
            console.log('editingForm class added to .form');
        } else {
            console.error('Form with class ".form" not found');
        }
    }
});

// ================================
// SIDEBAR INITIALIZATION (RESILIENT FOR K2)
// ================================
document.addEventListener("DOMContentLoaded", () => {
  let sidebarInitialized = false;

  function initSidebar() {
    if (sidebarInitialized) return; // Prevent duplicates
    sidebarInitialized = true;

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
              icon: "/Runtime/Styles/DAEP/images/sidebar/dashboard.png",
              name: "Dashboard",
              url: "/Runtime/Runtime/Form/Dashboard1/"
            }
          ]
        },
        {
          category: "Services",
          links: [
            //Finance
            {
              icon: "/Runtime/Styles/DAEP/images/sidebar/Finance.svg",
              name: "Finance",
              children: [
                { name: "New Device Notification", url: "#"},
                { name: "New Mobile Device Request Form", url: "#" },
                { name: "Reimbursement Request", url: "#" }
              ]
            },
            //Pre Qualifications
            {
              icon: "/Runtime/Styles/DAEP/images/sidebar/Pre - Qualification.svg",
              name: "Pre - Qualification",
              children: [
                { name: "PQ Vendor Initial Request", url: "#" },
                { name: "Vendor Prequalification", url: "#" },
                { name: "Vendor Prequalification - Specialized Services", url: "#" },
                { name: "PQ Scorecard - Contractor", url: "#" },
                { name: "PQ Scorecard - Consultant", url: "#" },
                { name: "PQ Scorecard - Supplier", url: "#" },
                { name: "PQ Scorecard - Specialized Services", url: "#" }
              ]
            },
            //HR - General
            {
              icon: "/Runtime/Styles/DAEP/images/sidebar/HR - General.svg",
              name: "HR - General",
              children: [
                { name: "Annual Tickets - Letter of Undertaking", url: "#" },
                { name: "Staff Leave Handover", url: "#" },
                { name: "CSR Posts", url: "#" },
                { name: "Education Allowance - Reimbursement Form", url: "#" },
                { name: "Education Allowance Log", url: "#" },
                { name: "Salary Transfer Request", url: "#" },
                { name: "Staff Address Information", url: "#" },
                { name: "DAEP Careers", url: "#" },
                { name: "HR Documents", url: "#" },
              ]
            },
            //HR - Training
            {
              icon: "/Runtime/Styles/DAEP/images/sidebar/HR - Training.svg",
              name: "HR - Training",
              children: [
                { name: "Annual Development Plan", url: "#" }
              ]
            },
            //HSSE - General
            {
              icon: "/Runtime/Styles/DAEP/images/sidebar/HSSE - General.svg",
              name: "HSSE - General",
              children: [
                { name: "Gate Pass", url: "/Runtime/Runtime/Form/GatePass.ManagerPage/" },
                { name: "Gate Pass Log", url: "/Runtime/Runtime/Form/GatePassLog.Form/ " },
                { name: "HSSE Roster", url: "#" },
                { name: "Staff Alternate Vehicle Pass Request", url: "#" },
                { name: "Daily Contractor - Consultant Manpower", url: "#" },
                { name: "Daily Contractor - Consultant Manpower - Daily Report", url: "#" },
                { name: "HSSE Inspection and Enforcement Notifications", url: "#" },
                { name: "Office Gate Entry", url: "#" },
                { name: "Office Gate Entry Report", url: "#" },
                { name: "Annual Maintenance Plan", url: "#" },
                { name: "Emergency Mock-up Drill RFA", url: "#" },
                { name: "Maintenance Request", url: "#" },
                { name: "Weekly Construction Activities", url: "#" },
                { name: "DAEP Document Authenticity", url: "#" },
                { name: "DAEP Staff Airside Gate Pass", url: "#" },
                { name: "DAEP Staff Airside Pass Tracker", url: "#" },
                { name: "ssTask Manager", url: "#" },
              ]
            },
            //HSSE - Airside
            {
              icon: "/Runtime/Styles/DAEP/images/sidebar/HSSE - Airside.svg",
              name: "HSSE - Airside",
              children: [
                { name: "Equipment Airside Pass", url: "/Runtime/Runtime/Form/EquipmentAirside.ManagerPage/ " },
                { name: "Staff Airside Pass", url: "#" },
                { name: "Vehicle Airside Pass", url: "#" },
                { name: "Material Pass", url: "#" },
                { name: "SFERD", url: "#" },
              ]
            },
            //HSSE - Landside
            {
              icon: "/Runtime/Styles/DAEP/images/sidebar/HSSE - Landslide.svg",
              name: "HSSE - Landside",
              children: [
                { name: "Equipment Landside Pass", url: "/Runtime/Runtime/Form/EquipmentLandside.ManagerPage/ " },
                { name: "Staff Landside Pass", url: "#"},
                { name: "Vehicle Landside Pass", url: "#"},
                { name: "Material Pass", url: "#"},
                { name: "Landside Day Pass", url: "#"},
                { name: "SFERD", url: "#"}
              ]
            },
            //Knowledge Management
            {
              icon: "/Runtime/Styles/DAEP/images/sidebar/Knowledge Management.svg",
              name: "Knowledge Management",
              children: [
                { name: "General Knowledge", url: "#" },
                { name: "Lessons Learned", url: "#" },
                { name: "Automation Lessons Learned", url: "#" }
              ]
            },
            //E-Services
            {
              icon: "/Runtime/Styles/DAEP/images/sidebar/E-Services.svg",
              name: "E-Services",
              children: [
                { name: "Gate Pass", url: "#" },
                { name: "Annual Tickets Declaration", url: "#" },
                { name: "Education Allowance Declaration", url: "#" },
                { name: "Annual Development Plan", url: "#" },
                { name: "Staff Alternate Vehicle Pass Request", url: "#" },
                { name: "DAEP Staff Airside Gate Pass", url: "#" },
                { name: "Maintenance Request", url: "#" },
                { name: "Leave Notification and Handover", url: "#" },
                { name: "Reimbursement Request", url: "#" },
                { name: "New Mobile Device Request", url: "#" },
                { name: "Staff Address Information", url: "#" },
                { name: "Grievance and Complaints Form", url: "#" }
              ]
            }
          ]
        }
      ];

      /* ============================================================
         3. Build Sidebar HTML
      ============================================================ */
      if (document.querySelector(".sidebar")) return; // Prevent duplicates

      document.body.insertAdjacentHTML("beforeend", `
        <aside class="sidebar">
          <div class="sidebarHeader">
           <div class="logo">
            <img src="/Runtime/Styles/DAEP/images/logo.svg" />
            <img src="/Runtime/Styles/DAEP/images/logo.png" />
           </div>
           <button class="collapseSidebar" type="button">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.43466 9.88314H19.9258C20.271 9.88314 20.5508 10.1816 20.5508 10.5498C20.5508 10.918 20.271 11.2165 19.9258 11.2165H6.43466L10.3677 15.4117C10.6118 15.6721 10.6118 16.0942 10.3677 16.3545C10.1236 16.6149 9.72792 16.6149 9.48384 16.3545L4.48384 11.0212C4.23976 10.7609 4.23976 10.3387 4.48384 10.0784L9.48384 4.74507C9.72792 4.48472 10.1236 4.48472 10.3677 4.74507C10.6118 5.00542 10.6118 5.42753 10.3677 5.68788L6.43466 9.88314ZM0.550781 1.21647C0.550781 0.848282 0.830603 0.549805 1.17578 0.549805C1.52096 0.549805 1.80078 0.848282 1.80078 1.21647V19.8831C1.80078 20.2513 1.52096 20.5498 1.17578 20.5498C0.830603 20.5498 0.550781 20.2513 0.550781 19.8831V1.21647Z" fill="white" stroke="white" stroke-width="1.1"/>
            </svg>
           </button>
          </div>
          <div class="sideBarLinksGroup"></div>
        </aside>

        <div class="overlayShadow" style="display:none;"></div>

        <aside class="subPanel">
          <div class="closeSubpanel">X</div>
          <div class="subPanelHeader"><h5 class="subSectionTitle"></h5></div>
          <div class="subPanelBody"><ul></ul></div>
        </aside>
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

          // Highlight active link
          if (link.url && currentPath === new URL(link.url, window.location.origin).pathname) {
            li.classList.add("active");
          }

          li.innerHTML = `
            <div class="icon"><img src="${link.icon}" alt=""></div>
            <a href="${link.url || '#'}">${link.name}</a>
          `;
          ul.appendChild(li);
        });

        category.appendChild(ul);
        sidebarContainer.appendChild(category);
      });

      /* ============================================================
         5. SubPanel Logic - FIXED CLICK HANDLER
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
        // Add click handler to the entire li element
        menu.addEventListener("click", function(e) {
          // Prevent default only if clicking on the anchor tag (which might have href="#")
          if (e.target.tagName === 'A' || e.target.closest('a')) {
            e.preventDefault();
          }
          $(".isSubMenu").removeClass("active");
          $(this).addClass("active");
          
          const title = this.querySelector("a").innerText.trim();
          const found = sidebarConfig
            .flatMap(s => s.links)
            .find(l => l.name === title);

          if (!found?.children?.length) {
            subPanel.classList.remove("active");
            updateOverlay();
            return;
          }

          subPanelTitle.textContent = title;
          subPanelList.innerHTML = "";

          found.children.forEach(child => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${child.url}">
              <div class="icon"><img src="/Runtime/Styles/DAEP/images/sidebar/sada.svg" alt=""></div>
              <span>${child.name}</span>
              </a>
            `;
            subPanelList.appendChild(li);
          });

          subPanel.classList.add("active");
          updateOverlay();
        });
        
        // Also handle clicks on the anchor tag specifically
        const anchor = menu.querySelector("a");
        if (anchor) {
          anchor.addEventListener("click", function(e) {
            // Prevent default for disabled links
            if (this.classList.contains("disabled")) {
              e.preventDefault();
              e.stopPropagation();
            }
          });
        }
      });

      closeSubpanelBtn.addEventListener("click", () => {
        subPanel.classList.remove("active");
        updateOverlay();
      });

      /* ============================================================
         6. Sidebar Collapse Functionality
      ============================================================ */
      function setupSidebarCollapse() {
        const collapseBtn = document.querySelector('.collapseSidebar');
        
        if (collapseBtn) {
          console.log('Collapse button found, adding click event');
          
          // Remove any existing event listeners first
          const newCollapseBtn = collapseBtn.cloneNode(true);
          collapseBtn.parentNode.replaceChild(newCollapseBtn, collapseBtn);
          
          // Add new event listener
          newCollapseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Collapse button clicked!');
            
            // Toggle collapsed-sidebar class on body
            document.body.classList.toggle('collapsed-sidebar');
            
            // Also update button rotation
            const svg = this.querySelector('svg');
            if (svg) {
              if (document.body.classList.contains('collapsed-sidebar')) {
                svg.style.transform = 'rotate(180deg)';
              } else {
                svg.style.transform = 'rotate(0deg)';
              }
            }
            
            console.log('Sidebar collapsed state:', document.body.classList.contains('collapsed-sidebar'));
          });
          
          // Add hover effect for visual feedback
          newCollapseBtn.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
          });
          
          newCollapseBtn.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
          });
        } else {
          console.error('Collapse button not found!');
        }
      }
      
      // Setup sidebar collapse after a brief delay to ensure DOM is ready
      setTimeout(setupSidebarCollapse, 100);

    } catch (err) {
      console.error("Error initializing sidebar:", err);
    }
  }

  // ================================
  // SAFELY WAIT FOR K2 TO FINISH RENDERING
  // ================================
  const observer = new MutationObserver(() => {
    const formBody = document.querySelector(".SourceCode-Forms-Controls-Web-Form");
    if (formBody && !sidebarInitialized) {
      initSidebar();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Fallback — initialize after 2s if observer misses
  setTimeout(initSidebar, 2000);
});

// ================================
// MOVE HEADER OUTSIDE FORM INTO <HEADER>
// ================================
// ================================
// MOVE HEADER OUTSIDE FORM INTO <HEADER> AND ADD COLLAPSE BUTTON
// ================================
(function moveFormToHeader() {

  function tryMove() {
    const element = document.querySelector('[name="s_header"]');
    const collapseButtonHTML = `
      <button class="headerCollapseSidebar" type="button">
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_152_874)">
<rect width="42" height="42" rx="8" fill="white" fill-opacity="0.15"/>
</g>
<rect x="0.5" y="0.5" width="41" height="41" rx="7.5" stroke="black" stroke-opacity="0.1"/>
<mask id="mask0_152_874" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="42" height="42">
<rect width="42" height="42" rx="8" fill="black" fill-opacity="0.1"/>
</mask>
<g mask="url(#mask0_152_874)">
<g style="mix-blend-mode:plus-lighter" opacity="0.9" filter="url(#filter1_f_152_874)">
<circle cx="27.2435" cy="-2.27022" r="15.8919" fill="white"/>
</g>
<g style="mix-blend-mode:plus-lighter" opacity="0.9" filter="url(#filter2_f_152_874)">
<circle cx="10.9192" cy="43.136" r="15.8919" fill="white"/>
</g>
</g>
<path d="M24.1161 20.3333H10.625C10.2798 20.3333 10 20.6318 10 21C10 21.3682 10.2798 21.6667 10.625 21.6667H24.1161L20.1831 25.8619C19.939 26.1223 19.939 26.5444 20.1831 26.8047C20.4271 27.0651 20.8229 27.0651 21.0669 26.8047L26.0669 21.4714C26.311 21.2111 26.311 20.7889 26.0669 20.5286L21.0669 15.1953C20.8229 14.9349 20.4271 14.9349 20.1831 15.1953C19.939 15.4556 19.939 15.8777 20.1831 16.1381L24.1161 20.3333ZM30 11.6667C30 11.2985 29.7202 11 29.375 11C29.0298 11 28.75 11.2985 28.75 11.6667V30.3333C28.75 30.7015 29.0298 31 29.375 31C29.7202 31 30 30.7015 30 30.3333V11.6667Z" fill="#333E48" stroke="#333E48" stroke-width="1.1"/>
<defs>
<filter id="filter0_i_152_874" x="0" y="0" width="42" height="42" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="3.5"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_152_874"/>
</filter>
<filter id="filter1_f_152_874" x="1.35156" y="-28.1621" width="51.7832" height="51.7832" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_152_874"/>
</filter>
<filter id="filter2_f_152_874" x="-24.9727" y="7.24414" width="71.7832" height="71.7832" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_152_874"/>
</filter>
</defs>
</svg>
      </button>
    `;

    if (!element) {
      // Retry after a short delay until K2 fully loads the DOM
      setTimeout(tryMove, 200);
      return;
    }

    // Remove from current parent
    const parent = element.parentNode;
    if (parent) parent.removeChild(element);

    // Create or find a <header> element
    let header = document.querySelector('header');
    if (!header) {
      header = document.createElement('header');
      document.body.insertBefore(header, document.body.firstChild);
    }

    // Append the element into <header>
    header.appendChild(element);
    
    // Add collapse button to header
    header.insertAdjacentHTML('beforeend', collapseButtonHTML);
    
    // Setup header collapse button functionality
    setupHeaderCollapseButton();
  }

  function setupHeaderCollapseButton() {
    const headerCollapseBtn = document.querySelector('.headerCollapseSidebar');
    
    if (headerCollapseBtn) {
      // Remove any existing event listeners first
      const newHeaderCollapseBtn = headerCollapseBtn.cloneNode(true);
      headerCollapseBtn.parentNode.replaceChild(newHeaderCollapseBtn, headerCollapseBtn);
      
      // Add click event to header collapse button
      newHeaderCollapseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Header collapse button clicked!');
        
        // Toggle collapsed-sidebar class on body
        document.body.classList.toggle('collapsed-sidebar');
        
        // Also update button rotation
        const svg = this.querySelector('svg');
        if (svg) {
          if (document.body.classList.contains('collapsed-sidebar')) {
            svg.style.transform = 'rotate(180deg)';
          } else {
            svg.style.transform = 'rotate(0deg)';
          }
        }
        
        // Also update the sidebar's collapse button if it exists
        const sidebarCollapseBtn = document.querySelector('.collapseSidebar');
        if (sidebarCollapseBtn) {
          const sidebarSvg = sidebarCollapseBtn.querySelector('svg');
          if (sidebarSvg) {
            if (document.body.classList.contains('collapsed-sidebar')) {
              sidebarSvg.style.transform = 'rotate(180deg)';
            } else {
              sidebarSvg.style.transform = 'rotate(0deg)';
            }
          }
        }
        
        console.log('Sidebar collapsed state:', document.body.classList.contains('collapsed-sidebar'));
      });
      
      // Add hover effect for visual feedback
      newHeaderCollapseBtn.addEventListener('mouseenter', function() {
        this.style.opacity = '0.8';
      });
      
      newHeaderCollapseBtn.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
      });
    }
  }

  // Start checking
  tryMove();
})();


$(document).ready(function () {

  /* =======================================
     1. CALENDAR — Add on-focus when clicking
  ========================================== */
  $(document).on("click", '.theme-entry .input-control.select-box .input-control-buttons a', function () {
      const cell = $(this).closest('[name*="s_calendar"]');
      if (cell.length) cell.addClass("on-focus");
  });


  /* =======================================
     2. CALENDAR — Maintain on-focus based on value
  ========================================== */
  $(document).on("input change", '[name*="s_calendar"] input', function () {
      const cell = $(this).closest('[name*="s_calendar"]');
      $(this).val().trim() !== "" ? cell.addClass("on-focus") : cell.removeClass("on-focus");
  });

  $('[name*="s_calendar"] input').each(function () {
      const cell = $(this).closest('[name*="s_calendar"]');
      if ($(this).val().trim() !== "") cell.addClass("on-focus");
  });

});


// FOCUS STATE FOR FIELDS
// Attach to ALL textboxes that are inside spans whose name contains "s_textbox"
$(document).on('focus', '[name*=s_textbox] input, [name*=s_textbox] > input', function () {
  if (!$(this).is('[readonly]')) {
    $(this).closest('[name*=s_textbox]').addClass('on-focus');
  }
});

$(document).on('blur', '[name*=s_textbox] input, [name*=s_textbox] > input', function () {
  const $parent = $(this).closest('[name*=s_textbox]');
  // If textbox is empty, remove class
  if ($(this).val().trim() === '') {
    $parent.removeClass('on-focus');
  }
});


// TextArea
$(document).on('focus', '[name*=s_textarea] textarea, [name*=s_textarea] > textarea', function () {
  if (!$(this).is('[readonly]')) {
    $(this).closest('[name*=s_textarea]').addClass('on-focus');
  }
});

$(document).on('blur', '[name*=s_textarea] textarea, [name*=s_textarea] > textarea', function () {
  const $parent = $(this).closest('[name*=s_textarea]');
  // If textarea is empty, remove class
  if ($(this).val().trim() === '') {
    $parent.removeClass('on-focus');
  }
});