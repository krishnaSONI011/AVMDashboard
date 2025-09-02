// Initialize page elements
    const page_1 = document.getElementById('page1');
    const page_2 = document.getElementById('page2');
    const page_3 = document.getElementById('page3');
    const page_4 = document.getElementById('page4');
    // const page_5 = document.getElementById('page5');
    // const page_6 = document.getElementById('page6');
    // const page_7 = document.getElementById('page7');
    // const page_8 = document.getElementById('page8')
    async function getThePage() {
        const res = await fetch('./page1.html');
        const res1 = await fetch('./page2.html')
        const res2 = await fetch('./page3.html')
        const res3 = await fetch('./page4.html')
        // const res4 = await fetch('./page5.html')
        // const res5 = await fetch('./page6.html')
        // const res6 = await fetch('./page7.html')
        // const res7 = await fetch('./page8.html')
        
        const html = await res.text();
        const html1 = await res1.text();
        const html2 = await res2.text();
        const html3 = await res3.text();
        // const html4 = await res4.text();
        // const html5 = await res5.text();
        // const html6 = await res6.text();
        // const html7 = await res7.text();
        page_1.innerHTML = html;
        page_2.innerHTML = html1
        page_3.innerHTML = html2
        page_4.innerHTML = html3
        // page_5.innerHTML = html4
        // page_6.innerHTML = html5
        // page_7.innerHTML = html6
        // page_8.innerHTML = html7
        
        setupPage1Events();
        setupPage2Events();
        setupPage3Events();
        console.log('About to setup drawn by me modal...');
        setupDrawnByMeModal(); // Setup immediately
        console.log('Finished setting up drawn by me modal');
        
        // Initialize legal heirs table after page content is loaded
        setTimeout(() => {
            if (typeof initializeLegalHeirsTable === 'function') {
                console.log('Calling initializeLegalHeirsTable from timeout');
                initializeLegalHeirsTableWithRetry();
            } else {
                console.log('initializeLegalHeirsTable function not found');
            }
            
            // Initialize petitioner text
            updatePetitionerText();
            
            // Update petitioner signature names
            updatePetitionerSignatureNames();
            
            // Update paragraph count
            updateParagraphCount();
            
            // Update declaration date
            updateDeclarationDate();
            
            // Setup drawn by me modal
            setupDrawnByMeModal();
        }, 500);
    }

    function initializeLegalHeirsTableWithRetry() {
        // Check if petitioner blocks are available
        const petitionerBlocks = document.querySelectorAll('.petitioner_block');
        console.log('Petitioner blocks found:', petitionerBlocks.length);
        
        if (petitionerBlocks.length > 0) {
            initializeLegalHeirsTable();
            // Update signature names after legal heirs table is initialized
            updatePetitionerSignatureNames();
        } else {
            console.log('No petitioner blocks found, retrying in 1 second...');
            setTimeout(() => {
                initializeLegalHeirsTableWithRetry();
            }, 1000);
        }
    }

    

    getThePage();

    // Helper function to convert numbers to roman numerals
    function numberToRoman(num) {
        const romanNumerals = [
            { value: 10, numeral: 'x' },
            { value: 9, numeral: 'ix' },
            { value: 5, numeral: 'v' },
            { value: 4, numeral: 'iv' },
            { value: 1, numeral: 'i' }
        ];
        
        let result = '';
        let remaining = num;
        
        for (const { value, numeral } of romanNumerals) {
            while (remaining >= value) {
                result += numeral;
                remaining -= value;
            }
        }
        
        return result;
    }

    // Global function to update petitioner signature names
    function updatePetitionerSignatureNames() {
        const namesDisplay = document.getElementById('petitioner-names-display');
        
        if (!namesDisplay) {
            console.log('Signature display element not found');
            return;
        }

        const petitionerBlocks = document.querySelectorAll('.petitioner_block');
        console.log('Found petitioner blocks:', petitionerBlocks.length);
        const petitionerNames = [];

        petitionerBlocks.forEach((block, index) => {
            const nameInput = block.querySelector('input[placeholder="Enter Petitioner Name"]');
            if (nameInput && nameInput.value.trim() !== '') {
                petitionerNames.push(nameInput.value.trim());
                console.log('Found petitioner name:', nameInput.value.trim());
            }
        });

        if (petitionerNames.length > 0) {
            // Create the display HTML
            let displayHTML = '';
            petitionerNames.forEach((name, index) => {
                displayHTML += `<div class="text-white mb-2">${name}</div>`;
                if (index < petitionerNames.length - 1) {
                    displayHTML += `<div class="text-white text-sm mb-3">Petitioner</div>`;
                }
            });
            
            // Add "Petitioner" after the last name
            displayHTML += `<div class="text-white text-sm">Petitioner</div>`;
            
            namesDisplay.innerHTML = displayHTML;
            console.log('Updated signature display with names:', petitionerNames);
        } else {
            namesDisplay.innerHTML = '';
            console.log('No petitioner names found, cleared signature');
        }

        // Also update the declaration section
        updateDeclarationSection(petitionerNames);
    }

    // Function to update declaration section on page 4
    function updateDeclarationSection(petitionerNames) {
        const declarationPronoun = document.getElementById('declaration-pronoun');
        const declarationNames = document.getElementById('declaration-petitioner-names');
        const declarationText = document.getElementById('declaration-petitioner-text');
        
        if (!declarationPronoun || !declarationNames || !declarationText) {
            console.log('Declaration elements not found');
            return;
        }

        if (petitionerNames.length > 0) {
            // Update pronoun (I/We)
            if (petitionerNames.length === 1) {
                declarationPronoun.textContent = 'I';
                declarationText.textContent = 'Petitioner';
            } else {
                declarationPronoun.textContent = 'We';
                declarationText.textContent = 'Petitioners';
            }

            // Update names
            if (petitionerNames.length === 1) {
                declarationNames.textContent = petitionerNames[0];
            } else {
                const formattedNames = petitionerNames.map((name, index) => `${index + 1}) ${name}`).join(', ');
                declarationNames.textContent = formattedNames;
            }

            console.log('Updated declaration section:', {
                pronoun: declarationPronoun.textContent,
                names: declarationNames.textContent,
                text: declarationText.textContent
            });
        } else {
            declarationPronoun.textContent = 'I';
            declarationNames.textContent = '';
            declarationText.textContent = 'Petitioner';
        }

        // Also update paragraph count
        updateParagraphCount();
        
        // Also update declaration date
        updateDeclarationDate();
        
        // Also update signature section
        updateSignatureSection(petitionerNames);
    }

    // Function to update declaration date with today's date
    function updateDeclarationDate() {
        const monthElement = document.getElementById('declaration-month');
        const yearElement = document.getElementById('declaration-year');
        
        if (!monthElement || !yearElement) {
            console.log('Declaration date elements not found');
            return;
        }

        const today = new Date();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const currentMonth = monthNames[today.getMonth()];
        const currentYear = today.getFullYear();
        
        monthElement.value = currentMonth;
        yearElement.value = currentYear;
        
        console.log('Updated declaration date:', currentMonth, currentYear);
    }

    // Function to update signature section with petitioner names
    function updateSignatureSection(petitionerNames) {
        const signatureNames = document.getElementById('petitioner-signature-names');
        
        if (!signatureNames) {
            console.log('Signature names element not found');
            return;
        }

        if (petitionerNames.length > 0) {
            // Format names with each petitioner on a new line
            const formattedNames = petitionerNames.map((name, index) => `${name}`).join('<br>');
            signatureNames.innerHTML = formattedNames;
            
            console.log('Updated signature section with names:', petitionerNames);
        } else {
            signatureNames.innerHTML = '';
        }
    }

    // Function to setup drawn by me modal functionality
    function setupDrawnByMeModal() {
        console.log('Setting up drawn by me modal...');
        
        const drawnByMeBtn = document.getElementById('drawn-by-me-btn');
        const drawnByMeModal = document.getElementById('drawn-by-me-modal');
        const drawnByMeTextarea = document.getElementById('drawn-by-me-textarea');
        
        // Setup advocate section hide button
        const hideAdvocateBtn = document.getElementById('hide-advocate-btn');
        if (hideAdvocateBtn) {
            hideAdvocateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const advocateSection = document.getElementById('advocate-section');
                if (advocateSection) {
                    advocateSection.style.display = 'none';
                    console.log('Advocate section hidden');
                }
            });
        }
        
        console.log('Elements found:', {
            button: !!drawnByMeBtn,
            modal: !!drawnByMeModal,
            textarea: !!drawnByMeTextarea
        });
        
        if (!drawnByMeBtn || !drawnByMeModal || !drawnByMeTextarea) {
            console.log('Drawn by me elements not found, retrying in 1 second...');
            setTimeout(setupDrawnByMeModal, 1000);
            return;
        }

        // Open modal when button is clicked
        drawnByMeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Drawn by me button clicked');
            drawnByMeModal.classList.remove('hidden');
            console.log('Opened drawn by me modal');
        });

        // Close modal when X is clicked
        const closeBtn = drawnByMeModal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                drawnByMeModal.classList.add('hidden');
                console.log('Closed drawn by me modal');
            });
        }

        // Handle option selection
        const modalOptions = drawnByMeModal.querySelectorAll('.modal-option');
        console.log('Found modal options:', modalOptions.length);
        
        modalOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Modal option clicked:', option.textContent);
                const selectedText = option.textContent;
                
                // Get petitioner names
                const petitionerBlocks = document.querySelectorAll('.petitioner_block');
                console.log('Found petitioner blocks:', petitionerBlocks.length);
                const petitionerNames = [];
                
                petitionerBlocks.forEach((block, index) => {
                    const nameInput = block.querySelector('input[placeholder="Enter Petitioner Name"]');
                    if (nameInput && nameInput.value.trim() !== '') {
                        petitionerNames.push(nameInput.value.trim());
                        console.log('Found petitioner name:', nameInput.value.trim());
                    }
                });
                
                console.log('Total petitioner names:', petitionerNames.length);
                
                // Only add the selected text to the textarea (no petitioner names)
                drawnByMeTextarea.value = selectedText;
                drawnByMeModal.classList.add('hidden');
                console.log('Final text set in textarea:', selectedText);
                console.log('Textarea value after setting:', drawnByMeTextarea.value);
            });
        });

        // Close modal when clicking outside
        drawnByMeModal.addEventListener('click', (e) => {
            if (e.target === drawnByMeModal) {
                drawnByMeModal.classList.add('hidden');
            }
        });

        // Test button functionality
        const testBtn = document.getElementById('test-modal-btn');
        if (testBtn) {
            testBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Test button clicked - manually opening modal');
                drawnByMeModal.classList.remove('hidden');
            });
        }
    }

    // Function to count and update paragraph numbers
    function updateParagraphCount() {
        const paragraphCountElement = document.getElementById('paragraph-count');
        if (!paragraphCountElement) {
            console.log('Paragraph count element not found');
            return;
        }

        // Count paragraphs in page 2 table - only count rows with numbered paragraphs
        const page2Table = document.querySelector('#page2 table tbody');
        let page2Count = 0;
        if (page2Table) {
            const page2Rows = page2Table.querySelectorAll('tr');
            page2Rows.forEach(row => {
                const firstCell = row.querySelector('td:first-child');
                if (firstCell && firstCell.textContent.trim().match(/^\d+\.$/)) {
                    page2Count++;
                }
            });
        }

        // Count paragraphs in page 3 table - only count rows with numbered paragraphs
        const page3Table = document.querySelector('#page3 table tbody');
        let page3Count = 0;
        if (page3Table) {
            const page3Rows = page3Table.querySelectorAll('tr');
            page3Rows.forEach(row => {
                const firstCell = row.querySelector('td:first-child');
                if (firstCell && firstCell.textContent.trim().match(/^\d+\.$/)) {
                    page3Count++;
                }
            });
        }

        // Total count
        const totalCount = page2Count + page3Count;
        
        paragraphCountElement.textContent = totalCount;
        console.log('Updated paragraph count:', totalCount, '(Page 2:', page2Count, '+ Page 3:', page3Count, ')');
    }

    // Global event listener as backup for consent affidavit button
  

    function setupPage1Events() {
       // get the current yaer
       const yearInput = document.getElementById('year_inputs');
       yearInput.value = new Date().getFullYear();
        // Deceased alias toggle
        const alias_button = document.getElementById('deceased_alias');
        const alias_box = document.getElementById('alias_container');
        const remove_button = document.getElementById('remove_deceased_alias');

        if (alias_button && remove_button) {
            alias_button.addEventListener('click', function (e) {
                e.preventDefault();
                alias_box.classList.remove('hidden');
                alias_button.classList.add('hidden');
            });

            remove_button.addEventListener('click', function (e) {
                e.preventDefault();
                alias_box.classList.add('hidden');
                alias_button.classList.remove('hidden');
            });
        }

        // page 1 modal button
        const death_first_question_close = document.getElementById('death_first_question_close');
        const first_question_yes_modal = document.getElementById('first_question_yes');
        const first_question_no_modal = document.getElementById('first_question_no');
        const death_first_question = document.getElementById('death_first_question');
        const second_question_back_button = document.getElementById('second_question_back')
        const second_question_yes = document.getElementById('second_question_yes')
        const second_question_no_button = document.getElementById('second_question_no')
        const rest_button  = document.getElementById("address_reset")
        const modal1 = document.getElementById("death_first_question")
        const modal2 = document.getElementById("death_second_question")
        const and = document.getElementById("and")


        const place_of_death_input = document.getElementById('place_of_death')
        const death_cer_address_input = document.getElementById('death_cer_address')
        const address_box = document.getElementById('ad')
        const show_both_line_box = document.getElementById('show_both_line')
        const died_text = document.getElementById("who")
          const death_second_question_close_box = document.getElementById('death_second_question_close');
        document.getElementById('address_des_button').addEventListener('click',(e)=>{
            e.preventDefault()
           modal1.classList.remove("hidden")
        })
        
            // yes yes model
            first_question_yes_modal.addEventListener("click",(e)=>{
                e.preventDefault()
                // console.log(e.target.dataset.action)
                
                    modal1.classList.add("hidden")
                    modal2.classList.remove("hidden")
                    second_question_yes.addEventListener("click",(e)=>{
                        e.preventDefault()
                        modal2.classList.add("hidden")
                        place_of_death_input.classList.remove("hidden")
                        des_button.classList.add("hidden")
                        death_cer_address_input.classList.remove('hidden')
                        address_box.classList.remove('hidden')
                        show_both_line_box.classList.remove('hidden')
                        rest_button.classList.remove("hidden")
                    })

                    second_question_no_button.addEventListener("click",(e)=>{
                        e.preventDefault()
                        modal2.classList.add("hidden")
                        des_button.classList.add("hidden")
                       // died_text.classList.add("hidden")
                        place_of_death_input.classList.remove("hidden")
                        address_box.classList.remove('hidden')
                        rest_button.classList.remove("hidden")
                        and.classList.remove("hidden")
                    })
                        
                    })
                
                    first_question_no_modal.addEventListener("click", (e)=>{
                        e.preventDefault()
                        modal1.classList.add("hidden")
                        modal2.classList.remove("hidden")
                        second_question_yes.addEventListener("click",(e)=>{
                            e.preventDefault()
                            modal2.classList.add("hidden")
                            
                            des_button.classList.add("hidden")
                            death_cer_address_input.classList.remove('hidden')
                            address_box.classList.remove('hidden')
                            show_both_line_box.classList.remove('hidden')
                            rest_button.classList.remove("hidden")
                        })
                        second_question_no_button.addEventListener("click",(e)=>{
                            e.preventDefault()
                            modal2.classList.add("hidden")
                            des_button.classList.add("hidden")
                            died_text.classList.add("hidden")
                            rest_button.classList.remove("hidden")
                            place_of_death_input.classList.add("hidden")
                            address_box.classList.remove('hidden')
                            
                        })
                        
                    })
                
                rest_button.addEventListener("click" , (e)=>{
                    e.preventDefault()
                    
                    place_of_death_input.classList.add("hidden")
                    des_button.classList.remove("hidden")
                    death_cer_address_input.classList.add('hidden')
                    address_box.classList.add('hidden')
                    show_both_line_box.classList.add('hidden')
                    rest_button.classList.add("hidden")
                })
        
                    
                second_question_back_button.addEventListener("click",(e)=>{
                    e.preventDefault()
                    modal2.classList.add("hidden")
                    modal1.classList.remove("hidden")
                })
                death_second_question_close_box.addEventListener("click",(e)=>{
                    e.preventDefault()
                    modal2.classList.add("hidden")
                })

                death_first_question_close.addEventListener("click",(e)=>{
                    e.preventDefault()
                    modal1.classList.add("hidden")
                })
            // const showModal = (id)=>{
            // document.querySelectorAll('.model').forEach(model => console.log("showing"))
            //  document.getElementById(id).classList.remove("hidden")
            // }








       
        const des_button = document.getElementById('address_des_button');
       
        // Petitioner add/remove
        const addPetitionerBtn = document.getElementById("add_petitioner_button");
        const petitionerWrapper = document.getElementById("petitioner_wrapper");

        if (addPetitionerBtn && petitionerWrapper) {
            addPetitionerBtn.addEventListener("click", () => {
                const lastBlock = petitionerWrapper.querySelector(".petitioner_block:last-child");
                const newBlock = lastBlock.cloneNode(true);

                // Reset values
                newBlock.querySelectorAll("input, select, textarea").forEach((el) => {
                    el.value = "";
                    if (el.tagName === "SELECT") el.selectedIndex = 0;
                });

                // Hide alias container in new block
                const aliasContainer = newBlock.querySelector(".petitioner-alias-container");
                if (aliasContainer) {
                    aliasContainer.classList.add("hidden");
                }

                // Hide address container in new block
                const addressContainer = newBlock.querySelector(".petitioner-address-container");
                if (addressContainer) {
                    addressContainer.classList.add("hidden");
                }

                newBlock.classList.add("border-t", "border-dashed", "border-black", "mt-4", "pt-4");

                // Petitioner number
                const allBlocks = petitionerWrapper.querySelectorAll(".petitioner_block");
                const numberSpan = newBlock.querySelector(".petitioner_number");
                if (numberSpan) numberSpan.textContent = `${allBlocks.length + 1}.`;

                // Remove button
                const oldRemoveBtn = newBlock.querySelector(".remove_petitioner_btn");
                if (oldRemoveBtn) oldRemoveBtn.remove();

                // Create container div for remove button
                const removeBtnContainer = document.createElement("div");
                removeBtnContainer.className = "flex justify-end mt-3";

                const removeBtn = document.createElement("button");
                removeBtn.className = "remove_petitioner_btn bg-gray-500 text-white px-3 py-1 rounded";
                removeBtn.textContent = "Remove Petitioner";
                removeBtn.onclick = () => {
                    newBlock.remove();
                    updatePetitionerNumbers();
                };

                removeBtnContainer.appendChild(removeBtn);
                newBlock.appendChild(removeBtnContainer);
                petitionerWrapper.appendChild(newBlock);
                updatePetitionerNumbers();
                
                // Setup alias functionality for the new block
                setupPetitionerAliasEvents(newBlock);
                
                // Setup address functionality for the new block
                setupPetitionerAddressEvents(newBlock);
            });
        }

        // Setup petitioner alias functionality
        function setupPetitionerAliasEvents(container = document) {
            const aliasButtons = container.querySelectorAll(".petitioner-alias-btn");
            const removeAliasButtons = container.querySelectorAll(".remove-petitioner-alias");

            aliasButtons.forEach(button => {
                button.addEventListener("click", function(e) {
                    e.preventDefault();
                    const aliasContainer = this.nextElementSibling;
                    if (aliasContainer && aliasContainer.classList.contains("petitioner-alias-container")) {
                        aliasContainer.classList.remove("hidden");
                        this.classList.add("hidden");
                    }
                });
            });

            removeAliasButtons.forEach(button => {
                button.addEventListener("click", function(e) {
                    e.preventDefault();
                    const aliasContainer = this.closest(".petitioner-alias-container");
                    const aliasButton = aliasContainer.previousElementSibling;
                    if (aliasContainer && aliasButton && aliasButton.classList.contains("petitioner-alias-btn")) {
                        aliasContainer.classList.add("hidden");
                        aliasButton.classList.remove("hidden");
                        // Clear the alias input
                        const aliasInput = aliasContainer.querySelector("input");
                        if (aliasInput) aliasInput.value = "";
                    }
                });
            });
        }

        // Setup alias functionality for existing petitioner blocks
        setupPetitionerAliasEvents();
        
        // Setup petitioner address functionality
        function setupPetitionerAddressEvents(container = document) {
            const addressButtons = container.querySelectorAll(".petitioner-address-btn");
            const removeAddressButtons = container.querySelectorAll(".remove-petitioner-address");

            addressButtons.forEach(button => {
                button.addEventListener("click", function(e) {
                    e.preventDefault();
                    currentPetitionerBlock = this.closest('.petitioner_block');
                    const modal = document.getElementById('petitioner_address_question');
                    if (modal) {
                        modal.classList.remove('hidden');
                    }
                });
            });

            removeAddressButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const addressContainer = this.closest(".petitioner-address-container");
                    const addressButton = addressContainer.previousElementSibling;
                    if (addressContainer && addressButton && addressButton.classList.contains("petitioner-address-btn")) {
                        addressContainer.classList.add("hidden");
                        addressButton.classList.remove("hidden");
                        // Clear the address input
                        const addressInput = addressContainer.querySelector("textarea");
                        if (addressInput) addressInput.value = "";
                    }
                });
            });
        }
        
        setupPetitionerAddressEvents();

        // Setup deceased address functionality
        function setupDeceasedAddressEvents() {
            const addressButtons = document.querySelectorAll(".deceased-address-btn");
            const removeAddressButtons = document.querySelectorAll(".remove-deceased-address");

            addressButtons.forEach(button => {
                button.addEventListener("click", function(e) {
                    e.preventDefault();
                    const modal = document.getElementById('deceased_address_question');
                    if (modal) {
                        modal.classList.remove('hidden');
                    }
                });
            });

            removeAddressButtons.forEach(button => {
                button.addEventListener("click", function(e) {
                    e.preventDefault();
                    const addressContainer = this.closest(".deceased-address-container");
                    const addressButton = addressContainer.previousElementSibling;
                    if (addressContainer && addressButton && addressButton.classList.contains("deceased-address-btn")) {
                        addressContainer.classList.add("hidden");
                        addressButton.classList.remove("hidden");
                        // Clear the address input
                        const addressInput = addressContainer.querySelector("textarea");
                        if (addressInput) addressInput.value = "";
                    }
                });
            });
        }
        
        setupDeceasedAddressEvents();

        // Setup petitioner display functionality
        function setupPetitionerDisplay() {
            // Function to update petitioner display (make it global)
            window.updatePetitionerDisplay = function() {
                const petitionerBlocks = document.querySelectorAll('.petitioner_block');
                const petitionerNameDisplay = document.querySelector('.petitioner-name-display');
                const petitionerAddressDisplay = document.querySelector('.petitioner-address-display');
                const petitionerReferenceText = document.querySelector('.petitioner-reference-text');
                
                if (petitionerBlocks.length > 0 && petitionerNameDisplay && petitionerAddressDisplay && petitionerReferenceText) {
                    // Get first petitioner's name
                    const firstPetitionerName = petitionerBlocks[0].querySelector('input[placeholder*="Petitioner Name"]');
                    const firstPetitionerAddress = petitionerBlocks[0].querySelector('textarea[placeholder*="Petitioner Address"]');
                    
                    if (firstPetitionerName && firstPetitionerName.value.trim() !== '') {
                        petitionerNameDisplay.value = firstPetitionerName.value;
                    } else {
                        petitionerNameDisplay.value = '';
                    }
                    
                    if (firstPetitionerAddress && firstPetitionerAddress.value.trim() !== '') {
                        petitionerAddressDisplay.value = firstPetitionerAddress.value;
                    } else {
                        petitionerAddressDisplay.value = '';
                    }
                    
                    // Update reference text based on number of petitioners
                    if (petitionerBlocks.length === 1) {
                        petitionerReferenceText.textContent = '(The Petitioner herein)';
                    } else {
                        petitionerReferenceText.textContent = '(The Petitioner No.1 herein)';
                    }
                }
            }
            
            // Set up event listeners for petitioner inputs
            function setupPetitionerInputListeners() {
                const petitionerInputs = document.querySelectorAll('.petitioner_block input, .petitioner_block textarea');
                petitionerInputs.forEach(input => {
                    // Remove existing listeners to avoid duplicates
                    input.removeEventListener('input', updatePetitionerDisplay);
                    input.removeEventListener('change', updatePetitionerDisplay);
                    // Add new listeners
                    input.addEventListener('input', updatePetitionerDisplay);
                    input.addEventListener('change', updatePetitionerDisplay);
                });

                // Set up signature name updates for petitioner name inputs specifically
                const petitionerNameInputs = document.querySelectorAll('.petitioner_block input[placeholder="Enter Petitioner Name"]');
                petitionerNameInputs.forEach(input => {
                    input.removeEventListener('input', updatePetitionerSignatureNames);
                    input.addEventListener('input', updatePetitionerSignatureNames);
                });
                
                // Also call it initially for any existing inputs
                updatePetitionerSignatureNames();
            }
            
            // Initial setup
            setupPetitionerInputListeners();
            updatePetitionerDisplay();
            updatePetitionerSignatureNames();
            
            // Set up observer to watch for new petitioner blocks
            const petitionerWrapper = document.getElementById('petitioner_wrapper');
            if (petitionerWrapper) {
                const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.type === 'childList') {
                            setupPetitionerInputListeners();
                            updatePetitionerDisplay();
                            updatePetitionerSignatureNames();
                        }
                    });
                });
                
                observer.observe(petitionerWrapper, {
                    childList: true,
                    subtree: true
                });
            }
        }
        
        setupPetitionerDisplay();

        // Setup deceased name auto-fill functionality
        function setupDeceasedNameAutoFill() {
            const mainDeceasedInput = document.querySelector('.deceased-name-main');
            
            if (mainDeceasedInput) {
                mainDeceasedInput.addEventListener('input', function() {
                    const deceasedName = this.value;
                    
                    // Find all deceased name inputs using dataset attribute
                    const allDeceasedInputs = document.querySelectorAll('input[data-deceased-name]');
                    
                    allDeceasedInputs.forEach(input => {
                        // Don't update the main input itself to avoid infinite loop
                        if (input !== mainDeceasedInput) {
                            input.value = deceasedName;
                        }
                    });
                });
            }
        }
        
        setupDeceasedNameAutoFill();

        // Setup exhibit select functionality
        function setupExhibitSelects() {
            // Handle all exhibit selects (both main and son)
            const allExhibitSelects = document.querySelectorAll('.exhibit-select, .son-exhibit-select');
            
            allExhibitSelects.forEach(select => {
                // Remove any existing event listeners to prevent duplicates
                select.removeEventListener('change', handleExhibitSelectChange);
                select.addEventListener('change', handleExhibitSelectChange);
                
                // Initialize previous value tracking
                if (!select.dataset.previousValue) {
                    select.dataset.previousValue = '';
                }
            });

            // Handle custom exhibit inputs
            const customExhibitInputs = document.querySelectorAll('.custom-exhibit-input');
            customExhibitInputs.forEach(input => {
                input.addEventListener('blur', function() {
                    if (this.value.trim() === '') {
                        this.classList.add('hidden');
                        const select = this.previousElementSibling;
                        if (select && select.classList.contains('exhibit-select')) {
                            select.classList.remove('hidden');
                            select.value = '';
                        }
                    }
                });
            });

            // Handle son custom exhibit inputs
            const sonCustomExhibitInputs = document.querySelectorAll('.son-custom-exhibit-input');
            sonCustomExhibitInputs.forEach(input => {
                input.addEventListener('blur', function() {
                    if (this.value.trim() === '') {
                        this.classList.add('hidden');
                        const select = this.previousElementSibling;
                        if (select && select.classList.contains('son-exhibit-select')) {
                            select.classList.remove('hidden');
                            select.value = '';
                        }
                    }
                });
            });
        }
        
        // Unified handler for exhibit select changes
        function handleExhibitSelectChange() {
            console.log('Exhibit select changed:', this.value, 'Previous:', this.dataset.previousValue);
            
            const customInput = this.nextElementSibling;
            const previousValue = this.dataset.previousValue || '';
            const currentValue = this.value;
            
            // Store the current value for next change
            this.dataset.previousValue = currentValue;
            
            // Handle custom option
            if (this.value === 'custom') {
                this.classList.add('hidden');
                if (customInput && (customInput.classList.contains('custom-exhibit-input') || customInput.classList.contains('son-custom-exhibit-input'))) {
                    customInput.classList.remove('hidden');
                    customInput.focus();
                }
            } else {
                if (customInput && (customInput.classList.contains('custom-exhibit-input') || customInput.classList.contains('son-custom-exhibit-input'))) {
                    customInput.classList.add('hidden');
                    customInput.value = '';
                }
            }
            
            // If value was cleared or changed, restore all options first
            if (currentValue === '' || (previousValue && previousValue !== currentValue)) {
                console.log('Restoring all options and re-applying selections');
                // Restore all options
                restoreExhibitOptions();
                
                // Then re-apply current selections from all dropdowns
                const allExhibitSelects = document.querySelectorAll('.exhibit-select, .son-exhibit-select');
                allExhibitSelects.forEach(otherSelect => {
                    if (otherSelect.value && otherSelect.value !== 'custom') {
                        updateExhibitDropdowns(otherSelect);
                    }
                });
            } else {
                console.log('Just updating other dropdowns to remove selected option');
                // Just update other dropdowns to remove the selected option
                updateExhibitDropdowns(this);
            }
        }
        
        // Function to update exhibit dropdowns when one is selected
        function updateExhibitDropdowns(selectedSelect) {
            const selectedValue = selectedSelect.value;
            if (!selectedValue || selectedValue === 'custom') return;
            
            console.log('Updating dropdowns to hide option:', selectedValue);
            
            // Get all exhibit selects (both main and son)
            const allExhibitSelects = document.querySelectorAll('.exhibit-select, .son-exhibit-select');
            
            allExhibitSelects.forEach(select => {
                if (select !== selectedSelect) {
                    // Remove the selected option from this dropdown
                    const optionToRemove = select.querySelector(`option[value="${selectedValue}"]`);
                    if (optionToRemove) {
                        optionToRemove.style.display = 'none';
                        optionToRemove.disabled = true;
                        console.log('Hidden option', selectedValue, 'in dropdown');
                    }
                }
            });
        }
        
        // Function to restore all exhibit options when one is deselected
        function restoreExhibitOptions() {
            console.log('Restoring all exhibit options');
            const allExhibitSelects = document.querySelectorAll('.exhibit-select, .son-exhibit-select');
            
            allExhibitSelects.forEach(select => {
                const options = select.querySelectorAll('option');
                options.forEach(option => {
                    option.style.display = '';
                    option.disabled = false;
                });
            });
            console.log('All options restored');
        }
        
        setupExhibitSelects();

        // Function to update legal heirs table numbering (exclude petitioner rows)
        function updateLegalHeirsTableNumbers() {
            const petitionerRows = document.querySelectorAll('#legal-heirs-table tbody tr.petitioner-row');
            const legalHeirsRows = document.querySelectorAll('#legal-heirs-table tbody tr:not(.petitioner-row)');
            
            legalHeirsRows.forEach((row, index) => {
                const firstCell = row.querySelector('td:first-child');
                if (firstCell) {
                    // Only update if it's a main heir (not a sub-heir with letters)
                    const currentText = firstCell.textContent.trim();
                    if (/^\d+$/.test(currentText)) {
                        firstCell.textContent = petitionerRows.length + index + 1;
                    }
                }
            });
        }

        // Setup petitioner address modal functionality
        const petitionerAddressModal = document.getElementById('petitioner_address_question');
        const petitionerAddressClose = document.getElementById('petitioner_address_close');
        const petitionerAddressYes = document.getElementById('petitioner_address_yes');
        const petitionerAddressNo = document.getElementById('petitioner_address_no');
        
        // Setup petitioner address type modal functionality
        const petitionerAddressTypeModal = document.getElementById('petitioner_address_type_question');
        const petitionerAddressTypeClose = document.getElementById('petitioner_address_type_close');
        const petitionerAddressDC = document.getElementById('petitioner_address_dc');
        const petitionerAddressPermanent = document.getElementById('petitioner_address_permanent');
        
        // Setup deceased address modal functionality
        const deceasedAddressModal = document.getElementById('deceased_address_question');
        const deceasedAddressClose = document.getElementById('deceased_address_close');
        const deceasedAddressDC = document.getElementById('deceased_address_dc');
        const deceasedAddressPermanent = document.getElementById('deceased_address_permanent');
        
        let currentPetitionerBlock = null;

        if (petitionerAddressClose) {
            petitionerAddressClose.addEventListener('click', (e) => {
                e.preventDefault();
                petitionerAddressModal.classList.add('hidden');
            });
        }

        if (petitionerAddressYes) {
            petitionerAddressYes.addEventListener('click', (e) => {
                e.preventDefault();
                petitionerAddressModal.classList.add('hidden');
                // Show the second modal to choose address type
                if (petitionerAddressTypeModal) {
                    petitionerAddressTypeModal.classList.remove('hidden');
                }
            });
        }

        if (petitionerAddressNo) {
            petitionerAddressNo.addEventListener('click', (e) => {
                e.preventDefault();
                petitionerAddressModal.classList.add('hidden');
                // If no, show the address input field
                if (currentPetitionerBlock) {
                    const addressContainer = currentPetitionerBlock.querySelector('.petitioner-address-container');
                    const addressButton = currentPetitionerBlock.querySelector('.petitioner-address-btn');
                    if (addressContainer && addressButton) {
                        addressContainer.classList.remove('hidden');
                        addressButton.classList.add('hidden');
                    }
                }
            });
        }

        // Setup second modal event listeners
        if (petitionerAddressTypeClose) {
            petitionerAddressTypeClose.addEventListener('click', (e) => {
                e.preventDefault();
                petitionerAddressTypeModal.classList.add('hidden');
            });
        }

        if (petitionerAddressDC) {
            petitionerAddressDC.addEventListener('click', (e) => {
                e.preventDefault();
                petitionerAddressTypeModal.classList.add('hidden');
                // Convert button to reset button with DC address
                if (currentPetitionerBlock) {
                    const addressButton = currentPetitionerBlock.querySelector('.petitioner-address-btn');
                    if (addressButton) {
                        addressButton.textContent = 'Reset Address (DC)';
                        addressButton.classList.remove('bg-red-500');
                        addressButton.classList.add('bg-orange-500');
                        addressButton.onclick = function(e) {
                            e.preventDefault();
                            // Reset to original state
                            addressButton.textContent = 'Same As Deceased Address';
                            addressButton.classList.remove('bg-orange-500');
                            addressButton.classList.add('bg-red-500');
                            // Restore original click handler
                            setupPetitionerAddressEvents(currentPetitionerBlock);
                        };
                    }
                }
            });
        }

        if (petitionerAddressPermanent) {
            petitionerAddressPermanent.addEventListener('click', (e) => {
                e.preventDefault();
                petitionerAddressTypeModal.classList.add('hidden');
                // Convert button to reset button with Permanent address
                if (currentPetitionerBlock) {
                    const addressButton = currentPetitionerBlock.querySelector('.petitioner-address-btn');
                    if (addressButton) {
                        addressButton.textContent = 'Reset Address (Permanent)';
                        addressButton.classList.remove('bg-red-500');
                        addressButton.classList.add('bg-orange-500');
                        addressButton.onclick = function(e) {
                            e.preventDefault();
                            // Reset to original state
                            addressButton.textContent = 'Same As Deceased Address';
                            addressButton.classList.remove('bg-orange-500');
                            addressButton.classList.add('bg-red-500');
                            // Restore original click handler
                            setupPetitionerAddressEvents(currentPetitionerBlock);
                        };
                    }
                }
            });
        }

        // Setup deceased address modal event listeners
        if (deceasedAddressClose) {
            deceasedAddressClose.addEventListener('click', (e) => {
                e.preventDefault();
                deceasedAddressModal.classList.add('hidden');
            });
        }

        if (deceasedAddressDC) {
            deceasedAddressDC.addEventListener('click', (e) => {
                e.preventDefault();
                deceasedAddressModal.classList.add('hidden');
                // Convert button to reset button with DC address
                const addressButton = document.querySelector('.deceased-address-btn');
                if (addressButton) {
                    addressButton.textContent = 'Reset Address (DC)';
                    addressButton.classList.remove('bg-blue-600');
                    addressButton.classList.add('bg-orange-500');
                    addressButton.onclick = function(e) {
                        e.preventDefault();
                        // Reset to original state
                        addressButton.textContent = 'ADDRESS OF DECEASED';
                        addressButton.classList.remove('bg-orange-500');
                        addressButton.classList.add('bg-blue-600');
                        // Restore original click handler
                        setupDeceasedAddressEvents();
                    };
                }
            });
        }

        if (deceasedAddressPermanent) {
            deceasedAddressPermanent.addEventListener('click', (e) => {
                e.preventDefault();
                deceasedAddressModal.classList.add('hidden');
                // Convert button to reset button with Permanent address
                const addressButton = document.querySelector('.deceased-address-btn');
                if (addressButton) {
                    addressButton.textContent = 'Reset Address (Permanent)';
                    addressButton.classList.remove('bg-blue-600');
                    addressButton.classList.add('bg-orange-500');
                    addressButton.onclick = function(e) {
                        e.preventDefault();
                        // Reset to original state
                        addressButton.textContent = 'ADDRESS OF DECEASED';
                        addressButton.classList.remove('bg-orange-500');
                        addressButton.classList.add('bg-blue-600');
                        // Restore original click handler
                        setupDeceasedAddressEvents();
                    };
                }
            });
        }

            function updatePetitionerNumbers() {
                const blocks = petitionerWrapper.querySelectorAll(".petitioner_block");
                blocks.forEach((block, index) => {
                    const numberSpan = block.querySelector(".petitioner_number");
                if (numberSpan) {
                    // Show number only when there's more than one petitioner
                    if (blocks.length > 1) {
                        numberSpan.textContent = `${index + 1}.`;
                        numberSpan.classList.remove('hidden');
                    } else {
                        numberSpan.classList.add('hidden');
                    }
                }

                    let removeBtn = block.querySelector(".remove_petitioner_btn");
                    if (!removeBtn && index > 0) {
                        // Create container div for remove button
                        const removeBtnContainer = document.createElement("div");
                        removeBtnContainer.className = "flex justify-end mt-3";

                        removeBtn = document.createElement("button");
                        removeBtn.className = "remove_petitioner_btn bg-gray-500 text-white px-3 py-3 rounded";
                        removeBtn.textContent = "Remove Petitioner";
                        removeBtn.onclick = () => {
                            block.remove();
                            updatePetitionerNumbers();
                        };
                        
                        removeBtnContainer.appendChild(removeBtn);
                        block.appendChild(removeBtnContainer);
                    } else if (removeBtn && index === 0) {
                        removeBtn.remove();
                    }
                });

            // Update "being" text based on number of petitioners
            updateBeingText(blocks.length);
            
            // Update petitioner text (singular/plural)
            updatePetitionerText();
            
            // Update petitioner display
            if (typeof window.updatePetitionerDisplay === 'function') {
                window.updatePetitionerDisplay();
            }
            
            // Update legal heirs table with new petitioner information
            if (typeof initializeLegalHeirsTable === 'function') {
                initializeLegalHeirsTable();
            }
            
            // Update legal heirs table numbering (exclude petitioner row)
            updateLegalHeirsTableNumbers();
        }
        }

        function updateBeingText(petitionerCount) {
            const beingTextElements = document.querySelectorAll(".petitioner-being-text");
            let newText = "being";
            
            if (petitionerCount === 2) {
                newText = "both";
            } else if (petitionerCount > 2) {
                newText = "all";
            }
            
            beingTextElements.forEach(element => {
                element.textContent = newText;
            });
        }




        // copy text  dc address - with retry mechanism
        function setupCopyButtons() {
        const dc_address_copy_button = document.getElementById("dc_address_button")
        const enter_addressProof_text = document.getElementById("enter_addressProof")
        const toast = document.getElementById("toast")
            
            console.log('Copy elements found:', {
                button: !!dc_address_copy_button,
                textarea: !!enter_addressProof_text,
                toast: !!toast
            });
        
        if (dc_address_copy_button && enter_addressProof_text && toast) {
                console.log('Setting up DC address copy button');
            dc_address_copy_button.addEventListener("click",(e)=>{
                e.preventDefault()
                    console.log('DC address copy button clicked');
                
                const dc_address = enter_addressProof_text.value
                    console.log('Text to copy:', dc_address);
                
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(dc_address).then(()=>{
                            console.log('Text copied successfully');
                toast.innerText = "DC ADDRESS COPY !"
                toast.classList.remove("hidden")

                            setTimeout(()=>{
                                toast.classList.add("hidden")
                                toast.innerText = ""
                            },2000)
                        }).catch(err => {
                            console.error('Copy failed:', err);
                            // Fallback for older browsers
                            enter_addressProof_text.select();
                            document.execCommand('copy');
                            toast.innerText = "DC ADDRESS COPY !"
                            toast.classList.remove("hidden")
                setTimeout(()=>{
                    toast.classList.add("hidden")
                    toast.innerText = ""
                },2000)
                })
                    } else {
                        // Fallback for browsers without clipboard API
                        enter_addressProof_text.select();
                        document.execCommand('copy');
                        toast.innerText = "DC ADDRESS COPY !"
                        toast.classList.remove("hidden")
                        setTimeout(()=>{
                            toast.classList.add("hidden")
                            toast.innerText = ""
                        },2000)
                    }
                })
            } else {
                console.log('Some copy elements not found, retrying in 1 second...');
                setTimeout(setupCopyButtons, 1000);
            }
        }
        
        // Initial setup
        setupCopyButtons();

        // copy address proof - with retry mechanism
        function setupAddressProofCopyButton() {
        const address_proof_copy_button = document.getElementById("address_proof_button")
        const address_proof_input = document.getElementById("address_proof")
            const toast = document.getElementById("toast")
            
        if (address_proof_copy_button && address_proof_input && toast) {
                console.log('Setting up address proof copy button');
            address_proof_copy_button.addEventListener("click",(e)=>{
                e.preventDefault()
                    console.log('Address proof copy button clicked');
                    
                    const address_text = address_proof_input.value
                    console.log('Text to copy:', address_text);
                    
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(address_text).then(()=>{
                            console.log('Address text copied successfully');
                toast.innerText = "Address Proof Copy"
                toast.classList.remove("hidden")

                            setTimeout(()=>{
                                toast.classList.add("hidden")
                                toast.innerText = ""
                            },2000)
                        }).catch(err => {
                            console.error('Copy failed:', err);
                            // Fallback for older browsers
                            address_proof_input.select();
                            document.execCommand('copy');
                            toast.innerText = "Address Proof Copy"
                            toast.classList.remove("hidden")
                setTimeout(()=>{
                    toast.classList.add("hidden")
                    toast.innerText = ""
                },2000)
                })
                    } else {
                        // Fallback for browsers without clipboard API
                        address_proof_input.select();
                        document.execCommand('copy');
                        toast.innerText = "Address Proof Copy"
                        toast.classList.remove("hidden")
                        setTimeout(()=>{
                            toast.classList.add("hidden")
                            toast.innerText = ""
                        },2000)
                    }
                })
            } else {
                console.log('Address proof copy elements not found, retrying in 1 second...');
                setTimeout(setupAddressProofCopyButton, 1000);
            }
        }
        
        // Initial setup
        setupAddressProofCopyButton();
        
        // copy petitioner address - with retry mechanism
        function setupPetitionerAddressCopyButton() {
            const petitioner_address_copy_button = document.getElementById("petitioner_address_copy_button")
            const petitioner_address_textarea = document.querySelector('textarea[placeholder="Enter Petitioner Address"]')
            const toast = document.getElementById("toast")
            
            console.log('Petitioner address copy elements found:', {
                button: !!petitioner_address_copy_button,
                textarea: !!petitioner_address_textarea,
                toast: !!toast
            });
            
            if (petitioner_address_copy_button && petitioner_address_textarea && toast) {
                console.log('Setting up petitioner address copy button');
                petitioner_address_copy_button.addEventListener("click",(e)=>{
                    e.preventDefault()
                    console.log('Petitioner address copy button clicked');
                    
                    const petitioner_address = petitioner_address_textarea.value
                    console.log('Text to copy:', petitioner_address);
                    
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(petitioner_address).then(()=>{
                            console.log('Petitioner address copied successfully');
                            toast.innerText = "Petitioner Address Copied!"
                            toast.classList.remove("hidden")

                            setTimeout(()=>{
                                toast.classList.add("hidden")
                                toast.innerText = ""
                            },2000)
                        }).catch(err => {
                            console.error('Copy failed:', err);
                            // Fallback for older browsers
                            petitioner_address_textarea.select();
                            document.execCommand('copy');
                            toast.innerText = "Petitioner Address Copied!"
                            toast.classList.remove("hidden")
                            setTimeout(()=>{
                                toast.classList.add("hidden")
                                toast.innerText = ""
                            },2000)
                        })
                    } else {
                        // Fallback for browsers without clipboard API
                        petitioner_address_textarea.select();
                        document.execCommand('copy');
                        toast.innerText = "Petitioner Address Copied!"
                        toast.classList.remove("hidden")
                        setTimeout(()=>{
                            toast.classList.add("hidden")
                            toast.innerText = ""
                        },2000)
                    }
                })
            } else {
                console.log('Petitioner address copy elements not found, retrying in 1 second...');
                setTimeout(setupPetitionerAddressCopyButton, 1000);
            }
        }
        
        // Initial setup
        setupPetitionerAddressCopyButton();
        
        // Setup his/her radio button functionality for all pages
        function setupHisHerRadioButtons() {
            console.log('setupHisHerRadioButtons function called');
            
            // Page 1 radio buttons
            const hisRadioPage1 = document.getElementById("html");
            const herRadioPage1 = document.getElementById("css");
            
            // Page 2 radio buttons
            const hisRadioPage2 = document.querySelector('input[name="gender1"][value="His"]');
            const herRadioPage2 = document.querySelector('input[name="gender1"][value="Her"]');
            
            // Page 2 surviving radio buttons
            const himRadioPage2 = document.getElementById("surviving_male");
            const herSurvivingRadioPage2 = document.getElementById("surviving_female");
            
            // Page 2 heir type radio buttons
            const hisHeirRadioPage2 = document.getElementById("heir_type1");
            const herHeirRadioPage2 = document.getElementById("heir_type2");
            
            console.log('His/Her radio buttons found:', {
                page1His: !!hisRadioPage1,
                page1Her: !!herRadioPage1,
                page2His: !!hisRadioPage2,
                page2Her: !!herRadioPage2,
                page2Him: !!himRadioPage2,
                page2HerSurviving: !!herSurvivingRadioPage2,
                page2HisHeir: !!hisHeirRadioPage2,
                page2HerHeir: !!herHeirRadioPage2
            });
            
            console.log('Page 1 radio elements:', {
                his: hisRadioPage1,
                her: herRadioPage1
            });
            
            // Function to update all his/her instances
            function updateHisHerText(selectedGender) {
                console.log('Updating his/her text to:', selectedGender);
                
                // First, let's find and log all text nodes that contain his/her patterns
                const xpath = "//text()[contains(., 'his/her') or contains(., 'he/she') or contains(., 'him/her') or contains(., 'his') or contains(., 'her')]";
                const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                
                console.log('Found', result.snapshotLength, 'text nodes with his/her patterns');
                
                let totalReplacements = 0;
                
                for (let i = 0; i < result.snapshotLength; i++) {
                    const textNode = result.snapshotItem(i);
                    let text = textNode.textContent;
                    const originalText = text;
                    
                    console.log(`Text node ${i + 1}: "${text.substring(0, 50)}..."`);
                    
                    // Replace his/her patterns based on selection
                    if (selectedGender === 'his') {
                        text = text.replace(/his\/her/g, 'his');
                        text = text.replace(/he\/she/g, 'he');
                        text = text.replace(/him\/her/g, 'him');
                        // Also replace standalone "her" when it's clearly about the deceased
                        text = text.replace(/\bher\b(?=\s+(?:death|property|credits|affidavit|certificate|lifetime|name))/g, 'his');
                    } else if (selectedGender === 'her') {
                        text = text.replace(/his\/her/g, 'her');
                        text = text.replace(/he\/she/g, 'she');
                        text = text.replace(/him\/her/g, 'her');
                        // Also replace standalone "his" when it's clearly about the deceased
                        text = text.replace(/\bhis\b(?=\s+(?:death|property|credits|affidavit|certificate|lifetime|name))/g, 'her');
                    }
                    
                    if (text !== originalText) {
                        console.log(`Replacing: "${originalText}" -> "${text}"`);
                        textNode.textContent = text;
                        totalReplacements++;
                    }
                }
                
                console.log(`Total replacements made: ${totalReplacements}`);
                
                // Also update any elements with data attributes for his/her
                const hisHerElements = document.querySelectorAll('[data-his-her]');
                console.log('Found', hisHerElements.length, 'elements with data-his-her attribute');
                hisHerElements.forEach(element => {
                    if (selectedGender === 'his') {
                        element.textContent = element.dataset.his || 'his';
                    } else if (selectedGender === 'her') {
                        element.textContent = element.dataset.her || 'her';
                    }
                });
                
                // Log success message
                console.log(`✅ Successfully updated ${totalReplacements} instances of his/her text to "${selectedGender}"`);
                
                // Trigger a small visual update to ensure changes are visible
                setTimeout(() => {
                    const elements = document.querySelectorAll('p, td, span, div');
                    elements.forEach(el => {
                        if (el.textContent.includes(selectedGender)) {
                            el.style.transform = 'translateZ(0)';
                        }
                    });
                }, 100);
            }
            
            // Function to setup synchronized radio button listeners
            function setupSynchronizedRadioButtons() {
                console.log('Setting up synchronized radio button listeners');
                
                // Select all his/her radio buttons with their actual values
                const allHisHerRadios = document.querySelectorAll('input[type="radio"][value="HTML"], input[type="radio"][value="CSS"], input[type="radio"][value="His"], input[type="radio"][value="Her"], input[type="radio"][value="Male"], input[type="radio"][value="Female"], input[type="radio"][value="only heirs"]');
                
                console.log('Found', allHisHerRadios.length, 'his/her radio buttons');
                
                allHisHerRadios.forEach(radio => {
                    radio.addEventListener('change', function() {
                        if (this.checked) {
                            let selectedValue = this.value;
                            console.log(`Radio clicked with value: ${selectedValue}`);
                            
                            // Map the radio values to his/her
                            let genderValue;
                            if (selectedValue === 'HTML' || selectedValue === 'His' || selectedValue === 'Male') {
                                genderValue = 'his';
                            } else if (selectedValue === 'CSS' || selectedValue === 'Her' || selectedValue === 'Female' || selectedValue === 'only heirs') {
                                genderValue = 'her';
                            } else {
                                return; // Skip if not a his/her radio
                            }
                            
                            console.log(`Mapped to gender value: ${genderValue}`);
                            
                            // Set all other radios with the same gender value
                            allHisHerRadios.forEach(r => {
                                let rGenderValue;
                                if (r.value === 'HTML' || r.value === 'His' || r.value === 'Male') {
                                    rGenderValue = 'his';
                                } else if (r.value === 'CSS' || r.value === 'Her' || r.value === 'Female' || r.value === 'only heirs') {
                                    rGenderValue = 'her';
                                } else {
                                    return;
                                }
                                
                                if (rGenderValue === genderValue) {
                                    r.checked = true;
                                }
                            });
                            
                            // Update the text based on selection
                            console.log(`Calling updateHisHerText with "${genderValue}"`);
                            updateHisHerText(genderValue);
                        }
                    });
                });
                
                // Check if any radio is already selected on page load
                const checkedRadio = Array.from(allHisHerRadios).find(radio => radio.checked);
                if (checkedRadio) {
                    const selectedValue = checkedRadio.value;
                    console.log(`Found pre-selected radio with value: ${selectedValue}`);
                    
                    // Map the radio value to his/her
                    let genderValue;
                    if (selectedValue === 'HTML' || selectedValue === 'His' || selectedValue === 'Male') {
                        genderValue = 'his';
                    } else if (selectedValue === 'CSS' || selectedValue === 'Her' || selectedValue === 'Female' || selectedValue === 'only heirs') {
                        genderValue = 'her';
                    }
                    
                    if (genderValue) {
                        console.log(`Mapped to gender value: ${genderValue}`);
                        updateHisHerText(genderValue);
                    }
                }
            }
            
                    // Setup synchronized radio buttons
        setupSynchronizedRadioButtons();
        
        // Setup unique share input functionality
        function setupUniqueShareInput() {
            const shareSelect = document.getElementById('share');
            const uniqueInput = document.getElementById('unique-share-input');
            
            if (shareSelect && uniqueInput) {
                shareSelect.addEventListener('change', function() {
                    if (this.value === 'Unique') {
                        uniqueInput.classList.remove('hidden');
                        uniqueInput.focus();
                    } else {
                        uniqueInput.classList.add('hidden');
                        uniqueInput.value = '';
                    }
                });
            }
        }
        
        // Setup unique share input
        setupUniqueShareInput();
        
        // Setup auto-scroll for appended paragraphs
        function setupAutoScrollForParagraphs() {
            const paragraphButtons = [
                'add-tenanted-para',
                'add-joint-deceased-para', 
                'add-two-name-para',
                'add-additional-para',
                'add-delay-para'
            ];
            
            paragraphButtons.forEach(buttonId => {
                const button = document.getElementById(buttonId);
                if (button) {
                    button.addEventListener('click', function() {
                        // Wait a bit for the paragraph to be appended
                        setTimeout(() => {
                            // Find the newly appended paragraph (usually the last paragraph in the table)
                            const table = document.querySelector('#page3 table tbody');
                            if (table) {
                                const rows = table.querySelectorAll('tr');
                                if (rows.length > 0) {
                                    const lastRow = rows[rows.length - 1];
                                    
                                    // Scroll to the last row with smooth animation
                                    console.log('Scrolling to newly appended paragraph');
                                    lastRow.scrollIntoView({ 
                                        behavior: 'smooth', 
                                        block: 'center' 
                                    });
                                }
                            }
                        }, 100); // Small delay to ensure paragraph is appended
                    });
                }
            });
        }
        
        // Setup auto-scroll functionality
        setupAutoScrollForParagraphs();
            
            // Check if any radio buttons are found
            const anyRadioFound = hisRadioPage1 || herRadioPage1 || hisRadioPage2 || herRadioPage2 || 
                                 himRadioPage2 || herSurvivingRadioPage2 || hisHeirRadioPage2 || herHeirRadioPage2;
            
            if (anyRadioFound) {
                console.log('Setting up his/her radio button listeners');
            } else {
                console.log('His/Her radio buttons not found, retrying in 1 second...');
                setTimeout(setupHisHerRadioButtons, 1000);
            }
        }
        
        // Initial setup
        setupHisHerRadioButtons();
        
        // Also setup when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setupHisHerRadioButtons();
                setupLegalHeirButtons();
            });
        } else {
            setupHisHerRadioButtons();
            setupLegalHeirButtons();
        }
    

    // Legal Heir functionality for page 2 - Global variables
    let legalHeirCounter = 0; // Will be set based on number of petitioners
    let subHeirCounter = 0; // Counter for sub-heirs
    
    console.log('Global variables initialized - legalHeirCounter:', legalHeirCounter, 'subHeirCounter:', subHeirCounter);

    function setupPage2Events() {
        // Initialize legal heirs table for page 2
        setTimeout(() => {
            initializeLegalHeirsTableWithRetry();
        }, 100);
        
        const the_proof_selector = document.getElementById('proof_select')
        if (the_proof_selector) {
            the_proof_selector.addEventListener("change",(e)=>{
                const uniqueProofInput = document.getElementById("unique_proof_input");
                const noProofSpan = document.getElementById("no_proof");
                
                if(e.target.value === "6") {
                    // Show unique proof input when UNIQUE is selected
                    if (uniqueProofInput) uniqueProofInput.classList.remove("hidden");
                    if (noProofSpan) noProofSpan.classList.add("hidden");
                } else if(e.target.value === "7") {
                    // Show no proof span when NO ID PROOF is selected
                    if (uniqueProofInput) uniqueProofInput.classList.add("hidden");
                    if (noProofSpan) noProofSpan.classList.remove("hidden");
                } else {
                    // Hide both for other options
                    if (uniqueProofInput) uniqueProofInput.classList.add("hidden");
                    if (noProofSpan) noProofSpan.classList.add("hidden");
                }
            })
        }

        // Setup buttons with retry mechanism
        setupLegalHeirButtons();
        
        // Setup remove buttons for existing sons
        setupSonRemoveButtons();
    }

    function setupLegalHeirButtons() {
        const addMoreLegalHeirBtn = document.getElementById('add-more-legal-heir');
        const addSubLegalHeirBtn = document.getElementById('add-sub-legal-heirs-separate');
        
        console.log('Setting up legal heir buttons...');
        console.log('Add More Legal Heir button found:', !!addMoreLegalHeirBtn);
        console.log('Add Sub Legal Heir button found:', !!addSubLegalHeirBtn);

        if (addMoreLegalHeirBtn) {
            addMoreLegalHeirBtn.addEventListener('click', addMoreLegalHeir);
        }

        if (addSubLegalHeirBtn) {
            addSubLegalHeirBtn.addEventListener('click', addSubLegalHeir);
        }

        // Set up event listeners for existing legal heir rows
        setupExistingLegalHeirEvents();

        // Only retry if essential buttons are missing
        if (!addMoreLegalHeirBtn) {
            console.log('Add More Legal Heir button not found, retrying in 1 second...');
            setTimeout(setupLegalHeirButtons, 1000);
        } else {
            console.log('Legal heir buttons setup completed');
        }
    }

    function setupExistingLegalHeirEvents() {
        console.log('Setting up existing legal heir events...');
        
        // Set up event listeners for existing legal heir rows
        const legalHeirRows = document.querySelectorAll('tr.legal-heir-row');
        legalHeirRows.forEach(row => {
            setupLegalHeirRowEvents(row);
        });
        
        // Set up event listeners for existing sub-heir rows
        const subHeirRows = document.querySelectorAll('tr.sub-heir-row');
        subHeirRows.forEach(row => {
            setupSubHeirRowEvents(row);
        });
        
        // Set up event listeners for existing sub-sub-heir rows
        const subSubHeirRows = document.querySelectorAll('tr.sub-sub-heir-row');
        subSubHeirRows.forEach(row => {
            setupSubSubHeirRowEvents(row);
        });
        
        console.log('Existing legal heir events set up');
    }

    function setupLegalHeirRowEvents(row) {
        // Add event listeners for alive/died radio buttons
        const aliveDiedRadios = row.querySelectorAll('.alive-died-radio');
        aliveDiedRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const heirId = row.dataset.heirId;
                const aliveDetails = document.getElementById(`alive_details_${heirId}`);
                const diedDetails = document.getElementById(`died_details_${heirId}`);
                const ageInput = document.getElementById(`age_input_${heirId}`);
                const ageDots = document.getElementById(`age_dots_${heirId}`);
                const addSubHeirsBtn = row.querySelector('.add-sub-heirs-btn');
                
                if (this.value === 'alive') {
                    aliveDetails.classList.remove('hidden');
                    diedDetails.classList.add('hidden');
                    // Show age input, hide dots
                    if (ageInput) ageInput.classList.remove('hidden');
                    if (ageDots) ageDots.classList.add('hidden');
                    // Show the Add Sub Legal Heirs button
                    if (addSubHeirsBtn) addSubHeirsBtn.classList.remove('hidden');
                } else if (this.value === 'died') {
                    aliveDetails.classList.add('hidden');
                    diedDetails.classList.remove('hidden');
                    // Hide age input, show dots
                    if (ageInput) ageInput.classList.add('hidden');
                    if (ageDots) ageDots.classList.remove('hidden');
                    // Show the Add Sub Legal Heirs button
                    if (addSubHeirsBtn) addSubHeirsBtn.classList.remove('hidden');
                } else {
                    aliveDetails.classList.add('hidden');
                    diedDetails.classList.add('hidden');
                    // Hide both age input and dots
                    if (ageInput) ageInput.classList.add('hidden');
                    if (ageDots) ageDots.classList.add('hidden');
                    // Hide the Add Sub Legal Heirs button
                    if (addSubHeirsBtn) addSubHeirsBtn.classList.add('hidden');
                }
            });
        });
        
        // Add event listener to the remove button
        const removeBtn = row.querySelector('.remove-row-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                row.remove();
                updateRowNumbers();
            });
        }
    }

    function initializeLegalHeirsTable() {
        console.log('Initializing legal heirs table...');
        const tbody = document.querySelector('#legal-heirs-table tbody');
        if (!tbody) {
            console.log('Table body not found');
            return;
        }
        
        // Remove any existing rows
        const existingRows = tbody.querySelectorAll('tr');
        existingRows.forEach(row => row.remove());
        
        // Get petitioner blocks
        const petitionerBlocks = document.querySelectorAll('.petitioner_block');
        const petitionerCount = petitionerBlocks.length;
        console.log('Found', petitionerCount, 'petitioner blocks');
        
        if (petitionerCount === 0) {
            console.log('No petitioner blocks found. Checking if page1 is loaded...');
            const page1Content = document.querySelector('#page1');
            console.log('Page1 content exists:', !!page1Content);
            if (page1Content) {
                console.log('Page1 innerHTML length:', page1Content.innerHTML.length);
            }
        }
        
        // Set the counter
        legalHeirCounter = petitionerCount;
        
        // Create rows for each petitioner
        for (let i = 0; i < petitionerCount; i++) {
            const petitionerBlock = petitionerBlocks[i];
            console.log('Processing petitioner block', i + 1);
            const newRow = document.createElement('tr');
            newRow.className = 'petitioner-row';
            newRow.dataset.petitionerIndex = i;
            
            // Get petitioner information from the block
            const nameInput = petitionerBlock.querySelector('input[placeholder="Enter Petitioner Name"]');
            const addressInput = petitionerBlock.querySelector('textarea[placeholder="Enter Petitioner Address"]');
            const ageInput = petitionerBlock.querySelector('input[placeholder="Enter Petitioner Age"]');
            const relationshipSelect = petitionerBlock.querySelector('select:last-of-type'); // The relationship select
            
            const petitionerName = nameInput ? nameInput.value : '';
            const petitionerAddress = addressInput ? addressInput.value : '';
            const petitionerAge = ageInput ? ageInput.value : '';
            const petitionerRelationship = relationshipSelect ? relationshipSelect.value : '';
            
            
            // Determine reference text based on petitioner number
            let referenceText = '(The Petitioner herein)';
            if (petitionerCount > 1) {
                referenceText = `(The Petitioner No.${i + 1} herein)`;
            }
            
            // Create the same structure for both single and multiple petitioners
            newRow.innerHTML = `
                <td class="border border-white p-2 text-center">${i + 1}</td>
                <td class="border border-white p-2">
                    <div class="space-y-2">
                        <!-- Parent Button -->
                        <div class="flex justify-end mb-2">
                            <button type="button" class="add-parent-btn bg-blue-600 text-white px-3 py-1 rounded text-sm" 
                                data-petitioner-index="${i}" data-petitioner-number="${i + 1}">
                                Add Parent of Petitioner ${i + 1}
                            </button>
                        </div>
                        
                        <input type="text" value="${petitionerName}" placeholder="NAME OF PETITIONER" class="w-full input border p-1 border-white rounded petitioner-name-display"> <br>
                        Residing at <input type="text" value="${petitionerAddress}" placeholder="ADDRESS OF PETITIONER AS PER TITLE OF PETITIONER" class="w-full input border p-1 border-white rounded petitioner-address-display">  <br>
                        <br>
                        
                        <span class="petitioner-reference-text text-white">${referenceText}</span>
                        <div class="mt-2">
                           
                        </div>
                    </div>
                </td>
                <td class="border border-white p-2">
                    <input type="text" value="${petitionerAge}" placeholder="Enter Age" class="w-full input border p-1 border-white rounded petitioner-age-display text-center">
                </td>
                <td class="border border-white p-2">
                    <select class="w-full input border p-1 border-white rounded petitioner-relationship-display">
                        <option value="">Select Relation to Deceased</option>
                        <option value="Widow" ${petitionerRelationship === 'Widow' ? 'selected' : ''}>Widow</option>
                        <option value="Widower" ${petitionerRelationship === 'Widower' ? 'selected' : ''}>Widower</option>
                        <option value="Son" ${petitionerRelationship === 'Son' ? 'selected' : ''}>Son</option>
                        <option value="Daughter" ${petitionerRelationship === 'Daughter' ? 'selected' : ''}>Daughter</option>
                        <option value="Mother" ${petitionerRelationship === 'Mother' ? 'selected' : ''}>Mother</option>
                        <option value="Father" ${petitionerRelationship === 'Father' ? 'selected' : ''}>Father</option>
                        <option value="Brother" ${petitionerRelationship === 'Brother' ? 'selected' : ''}>Brother</option>
                        <option value="Sister" ${petitionerRelationship === 'Sister' ? 'selected' : ''}>Sister</option>
                        <option value="Grandson" ${petitionerRelationship === 'Grandson' ? 'selected' : ''}>Grandson</option>
                        <option value="Granddaughter" ${petitionerRelationship === 'Granddaughter' ? 'selected' : ''}>Granddaughter</option>
                        <option value="Uncle" ${petitionerRelationship === 'Uncle' ? 'selected' : ''}>Uncle</option>
                        <option value="Aunt" ${petitionerRelationship === 'Aunt' ? 'selected' : ''}>Aunt</option>
                        <option value="Nephew" ${petitionerRelationship === 'Nephew' ? 'selected' : ''}>Nephew</option>
                        <option value="Niece" ${petitionerRelationship === 'Niece' ? 'selected' : ''}>Niece</option>
                        <option value="Cousin" ${petitionerRelationship === 'Cousin' ? 'selected' : ''}>Cousin</option>
                        <option value="Cousin" ${petitionerRelationship === 'Married Daughter' ? 'selected' : ''}>Married Daughter</option>
                        <option value="Married Granddaughter" ${petitionerRelationship === 'Married Granddaughter' ? 'selected' : ''}>Married Granddaughter</option>
                        <option value="Married Sister" ${petitionerRelationship === 'Married Sister' ? 'selected' : ''}>Married Sister</option>
                        <option value="Married Sister" ${petitionerRelationship === 'Married Niece' ? 'selected' : ''}>Married Niece</option>
                        <option value="Married Sister" ${petitionerRelationship === 'Daughter in Law' ? 'selected' : ''}>Daughter in Law</option>
                        <option value="Married Sister" ${petitionerRelationship === 'Minor Son' ? 'selected' : ''}>Minor Son</option>
                        <option value="Married Sister" ${petitionerRelationship === 'Minor Daughter' ? 'selected' : ''}>Minor Daughter</option>
                        <option value="Other" ${petitionerRelationship === 'Brother in Law' ? 'selected' : ''}> Brother in Law</option>
                        <option value="Other" ${petitionerRelationship === 'Sister in Law' ? 'selected' : ''}> Sister in Law</option>
                    </select>
                </td>
                <td class="border border-white p-2 text-center">
                    <!-- No action needed for petitioner -->
                </td>
            `;
            
            tbody.appendChild(newRow);
        }
        
        // Update row numbers
        updateRowNumbers();
        
        // Set up real-time sync for petitioner data
        setupPetitionerDataSync();
        
        // Set up event listeners for petitioner sub-heir buttons
        setupPetitionerSubHeirButtons();
        
        // Set up event listener for separate Add Sub Legal Heirs button
        setupSeparateSubHeirsButton();
        
        // Set up event listeners for parent buttons
        setupParentButtons();
    }

    function setupParentButtons() {
        console.log('Setting up parent buttons...');
        
        // Use event delegation on the table body for parent buttons
        const tbody = document.querySelector('#legal-heirs-table tbody');
        if (!tbody) {
            console.log('Table body not found for parent button setup');
            return;
        }
        
        // Remove existing delegated event listener
        tbody.removeEventListener('click', handleDelegatedParentClick);
        
        // Add delegated event listener
        tbody.addEventListener('click', handleDelegatedParentClick);
    }

    function handleDelegatedParentClick(event) {
        console.log('Delegated parent click handler called, target:', event.target);
        
        // Check if the clicked element is an add-parent-btn
        if (event.target.classList.contains('add-parent-btn')) {
            console.log('Parent button clicked via delegation:', event.target);
            
            const petitionerIndex = parseInt(event.target.dataset.petitionerIndex);
            const petitionerNumber = parseInt(event.target.dataset.petitionerNumber);
            
            console.log('Button data:', {
                petitionerIndex: petitionerIndex,
                petitionerNumber: petitionerNumber,
                target: event.target
            });
            
            addParentRow(petitionerIndex, petitionerNumber);
        }
        
        // Check if the clicked element is a remove-parent-btn
        if (event.target.classList.contains('remove-parent-btn')) {
            console.log('Remove parent button clicked via delegation:', event.target);
            
            const petitionerIndex = parseInt(event.target.dataset.petitionerIndex);
            removeParentRow(petitionerIndex);
        }
    }

    function addParentRow(petitionerIndex, petitionerNumber) {
        console.log('Adding parent row for petitioner:', petitionerNumber);
        
        const tbody = document.querySelector('#legal-heirs-table tbody');
        if (!tbody) {
            console.log('Table body not found');
            return;
        }
        
        // Find the petitioner row
        const petitionerRows = tbody.querySelectorAll('tr.petitioner-row');
        const petitionerRow = petitionerRows[petitionerIndex];
        
        if (!petitionerRow) {
            console.log('Petitioner row not found');
            return;
        }
        
        // Create parent row
        const parentRow = document.createElement('tr');
        parentRow.className = 'parent-row';
        parentRow.dataset.petitionerIndex = petitionerIndex;
        
        // Create parent row content
        parentRow.innerHTML = `
            <td class="border border-white p-2 text-center">${petitionerNumber}</td>
            <td class="border border-white p-2">
                <div class="space-y-2">
                    <input type="text" placeholder="NAME OF PARENT" class="w-full input border p-1 border-white rounded parent-name-display">
                    
                    <!-- Address Field (Initially Hidden) -->
                    <div class="parent-address-container hidden">
                        <br>
                        Residing at <input type="text" placeholder="ADDRESS OF PARENT" class="w-full input border p-1 border-white rounded parent-address-display">
                    </div>
                    
                    <br>
                    
                    <!-- Death Status Radio Buttons -->
                    <div class="flex space-x-4 text-white">
                        <label class="flex items-center">
                            <input type="radio" name="death_status_${petitionerIndex}" value="since_deceased" class="mr-2 parent-death-radio">
                            Since Deceased
                        </label>
                        <label class="flex items-center">
                            <input type="radio" name="death_status_${petitionerIndex}" value="pre_deceased" class="mr-2 parent-death-radio">
                            Pre Deceased
                        </label>
                    </div>
                    
                    <span class="text-white text-sm">(Parent of Petitioner ${petitionerNumber})</span>
                </div>
            </td>
            <td class="border border-white p-2 text-center">
                <span class="text-white">- - -</span>
            </td>
            <td class="border border-white p-2">
                <select class="w-full input border p-1 border-white rounded">
                    <option value="">Select Relation to Deceased</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                </select>
            </td>
            <td class="border border-white p-2 text-center">
                <button type="button" class="remove-parent-btn bg-red-500 text-white px-2 py-1 rounded text-sm" 
                    data-petitioner-index="${petitionerIndex}">Remove</button>
            </td>
        `;
        
        // Insert parent row before the petitioner row
        petitionerRow.parentNode.insertBefore(parentRow, petitionerRow);
        
        // Set the parent row number directly
        const parentNumberCell = parentRow.querySelector('td:first-child');
        if (parentNumberCell) {
            parentNumberCell.textContent = petitionerNumber;
        }
        
        // Update the petitioner row number to show (a)
        const petitionerNumberCell = petitionerRow.querySelector('td:first-child');
        if (petitionerNumberCell) {
            petitionerNumberCell.textContent = `${petitionerNumber}(a)`;
        }
        
        // Update row numbers to ensure proper numbering
        updateRowNumbers();
        
        // Set up event listeners for parent death status radio buttons
        const parentDeathRadios = parentRow.querySelectorAll('.parent-death-radio');
        parentDeathRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const addressContainer = parentRow.querySelector('.parent-address-container');
                if (addressContainer) {
                    if (this.value === 'since_deceased' || this.value === 'pre_deceased') {
                        // Hide address when any death status is selected
                        addressContainer.classList.add('hidden');
                    } else {
                        // Show address when no death status is selected
                        addressContainer.classList.remove('hidden');
                    }
                }
            });
        });
        
        // Disable the parent button for this petitioner
        const parentBtn = petitionerRow.querySelector('.add-parent-btn');
        if (parentBtn) {
            parentBtn.disabled = true;
            parentBtn.classList.add('opacity-50', 'cursor-not-allowed');
            parentBtn.textContent = 'Parent Added';
        }
        
        console.log('Parent row added successfully');
    }

    function updateRowNumbersAfterParent(petitionerIndex) {
        console.log('Updating row numbers after adding parent for petitioner:', petitionerIndex);
        
        const tbody = document.querySelector('#legal-heirs-table tbody');
        if (!tbody) {
            console.log('Table body not found');
            return;
        }
        
        // Get all rows in order
        const allRows = Array.from(tbody.querySelectorAll('tr'));
        let currentNumber = 1;
        
        allRows.forEach((row, rowIndex) => {
            const numberCell = row.querySelector('td:first-child');
            if (!numberCell) return;
            
            if (row.classList.contains('parent-row')) {
                // This is a parent row, assign current number
                numberCell.textContent = currentNumber;
                currentNumber++;
            } else if (row.classList.contains('petitioner-row')) {
                // This is a petitioner row, check if it has a parent
                const hasParent = tbody.querySelector(`tr.parent-row[data-petitioner-index="${petitionerIndex}"]`);
                
                if (hasParent && parseInt(row.dataset.petitionerIndex) === petitionerIndex) {
                    // This petitioner has a parent, show (a) suffix
                    // The parent number is currentNumber - 1
                    numberCell.textContent = `${currentNumber - 1}(a)`;
                } else {
                    // This petitioner has no parent, show regular number
                    numberCell.textContent = currentNumber;
                    currentNumber++;
                }
            } else {
                // This is a regular legal heir row
                numberCell.textContent = currentNumber;
                currentNumber++;
            }
        });
        
        console.log('Row numbers updated after parent addition');
    }

    function updateSubsequentRowNumbers(petitionerIndex) {
        console.log('Updating subsequent row numbers after adding parent for petitioner:', petitionerIndex);
        
        const tbody = document.querySelector('#legal-heirs-table tbody');
        if (!tbody) {
            console.log('Table body not found');
            return;
        }
        
        // Get all rows in order
        const allRows = Array.from(tbody.querySelectorAll('tr'));
        let currentNumber = 1;
        
        allRows.forEach((row, rowIndex) => {
            const numberCell = row.querySelector('td:first-child');
            if (!numberCell) return;
            
            if (row.classList.contains('parent-row')) {
                // This is a parent row, assign current number
                numberCell.textContent = currentNumber;
                currentNumber++;
            } else if (row.classList.contains('petitioner-row')) {
                // This is a petitioner row, check if it has a parent
                const hasParent = tbody.querySelector(`tr.parent-row[data-petitioner-index="${petitionerIndex}"]`);
                
                if (hasParent && parseInt(row.dataset.petitionerIndex) === petitionerIndex) {
                    // This petitioner has a parent, show (a) suffix
                    // Don't increment currentNumber for (a) rows
                    numberCell.textContent = `${currentNumber - 1}(a)`;
                } else {
                    // This petitioner has no parent, show regular number
                    numberCell.textContent = currentNumber;
                    currentNumber++;
                }
            } else {
                // This is a regular legal heir row
                numberCell.textContent = currentNumber;
                currentNumber++;
            }
        });
        
        console.log('Subsequent row numbers updated');
    }

    function updateRowNumbersAfterParentRemoval(petitionerIndex) {
        console.log('Updating row numbers after removing parent for petitioner:', petitionerIndex);
        
        const tbody = document.querySelector('#legal-heirs-table tbody');
        if (!tbody) {
            console.log('Table body not found');
            return;
        }
        
        // Get all rows in order
        const allRows = Array.from(tbody.querySelectorAll('tr'));
        let currentNumber = 1;
        
        allRows.forEach((row, rowIndex) => {
            const numberCell = row.querySelector('td:first-child');
            if (!numberCell) return;
            
            if (row.classList.contains('parent-row')) {
                // This is a parent row, keep the current number
                numberCell.textContent = currentNumber;
                currentNumber++;
            } else if (row.classList.contains('petitioner-row')) {
                // This is a petitioner row, check if it has a parent
                const hasParent = tbody.querySelector(`tr.parent-row[data-petitioner-index="${petitionerIndex}"]`);
                if (hasParent && parseInt(row.dataset.petitionerIndex) === petitionerIndex) {
                    // This petitioner still has a parent, show (a) suffix
                    numberCell.textContent = `${currentNumber - 1}(a)`;
                } else {
                    // This petitioner has no parent, show regular number
                    numberCell.textContent = currentNumber;
                    currentNumber++;
                }
            } else {
                // This is a regular legal heir row
                numberCell.textContent = currentNumber;
                currentNumber++;
            }
        });
        
        console.log('Row numbers updated after parent removal');
    }

    function removeParentRow(petitionerIndex) {
        console.log('Removing parent row for petitioner:', petitionerIndex);
        
        const tbody = document.querySelector('#legal-heirs-table tbody');
        if (!tbody) {
            console.log('Table body not found');
            return;
        }
        
        // Find the parent row
        const parentRow = tbody.querySelector(`tr.parent-row[data-petitioner-index="${petitionerIndex}"]`);
        if (!parentRow) {
            console.log('Parent row not found');
            return;
        }
        
        // Find the petitioner row
        const petitionerRows = tbody.querySelectorAll('tr.petitioner-row');
        const petitionerRow = petitionerRows[petitionerIndex];
        
        if (!petitionerRow) {
            console.log('Petitioner row not found');
            return;
        }
        
        // Remove the parent row
        parentRow.remove();
        
        // Update row numbers after removing parent
        updateRowNumbers();
        
        // Re-enable the parent button for this petitioner
        const parentBtn = petitionerRow.querySelector('.add-parent-btn');
        if (parentBtn) {
            parentBtn.disabled = false;
            parentBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            parentBtn.textContent = `Add Parent of Petitioner ${petitionerIndex + 1}`;
        }
        
        console.log('Parent row removed successfully');
    }

    function setupPetitionerSubHeirButtons() {
        console.log('Setting up petitioner sub-heir buttons...');
        
        // Use event delegation on the table body
        const tbody = document.querySelector('#legal-heirs-table tbody');
        if (!tbody) {
            console.log('Table body not found for event delegation');
            return;
        }
        
        // Remove existing delegated event listener
        tbody.removeEventListener('click', handleDelegatedSubHeirClick);
        
        // Add delegated event listener
        tbody.addEventListener('click', handleDelegatedSubHeirClick);
        
        // Also check individual buttons for debugging
        const petitionerRows = document.querySelectorAll('#legal-heirs-table tbody tr.petitioner-row');
        console.log('Found petitioner rows:', petitionerRows.length);
        
        petitionerRows.forEach((row, index) => {
            const addSubHeirsBtn = row.querySelector('.add-sub-heirs-btn');
            console.log(`Petitioner row ${index + 1}: button exists =`, !!addSubHeirsBtn);
            if (addSubHeirsBtn) {
                console.log('Button data:', {
                    heirId: addSubHeirsBtn.dataset.heirId,
                    petitioner: addSubHeirsBtn.dataset.petitioner,
                    className: addSubHeirsBtn.className
                });
            }
        });
    }

    function handleDelegatedSubHeirClick(event) {
        console.log('Delegated click handler called, target:', event.target);
        // Check if the clicked element is an add-sub-heirs-btn
        if (event.target.classList.contains('add-sub-heirs-btn')) {
            console.log('Sub-heir button clicked via delegation:', event.target);
            
            const heirId = event.target.dataset.heirId;
            const isPetitioner = event.target.dataset.petitioner === 'true';
            
            console.log('Button data:', {
                heirId: heirId,
                isPetitioner: isPetitioner,
                target: event.target
            });
            
            if (heirId) {
                addSubLegalHeirsForHeir(heirId, isPetitioner);
            } else {
                console.error('No heir ID found on button');
            }
        }
    }

    function handlePetitionerSubHeirClick(event) {
        console.log('Petitioner sub-heir button clicked');
        const heirId = event.target.dataset.heirId;
        const isPetitioner = event.target.dataset.petitioner === 'true';
        console.log('Heir ID:', heirId, 'Is Petitioner:', isPetitioner);
        addSubLegalHeirsForHeir(heirId, isPetitioner);
    }

// select the unique select exibit 
const select = document.querySelectorAll('[data-unique="true"]');
function updateUniqueSelects() {
    const selectedValues = Array.from(select).map((s)=>s.value).filter(value => value !== '');
    select.forEach((s) => {
        s.querySelectorAll('option').forEach((option) => {
            if (selectedValues.includes(option.value) && option.value !== s.value) {
                option.disabled = true;
                option.style.display = 'none';
            } else {
                option.disabled = false;
                option.style.display = '';
            }
        });
    });
}
select.forEach(select => {
    select.addEventListener("change", updateUniqueSelects);
  });
    function setupPetitionerDataSync() {
        // Set up event listeners for petitioner inputs to sync with legal heirs table
        const petitionerBlocks = document.querySelectorAll('.petitioner_block');
        
        petitionerBlocks.forEach((block, index) => {
            const nameInput = block.querySelector('input[placeholder="Enter Petitioner Name"]');
            const addressInput = block.querySelector('textarea[placeholder="Enter Petitioner Address"]');
            const ageInput = block.querySelector('input[placeholder="Enter Petitioner Age"]');
            const relationshipSelect = block.querySelector('select:last-of-type'); // The relationship select
            
            if (nameInput) {
                nameInput.addEventListener('input', function() {
                    updatePetitionerInLegalHeirsTable(index, 'name', this.value);
                });
            }
            
            if (addressInput) {
                addressInput.addEventListener('input', function() {
                    updatePetitionerInLegalHeirsTable(index, 'address', this.value);
                });
            }
            
            if (ageInput) {
                ageInput.addEventListener('input', function() {
                    updatePetitionerInLegalHeirsTable(index, 'age', this.value);
                });
            }
            
            if (relationshipSelect) {
                relationshipSelect.addEventListener('change', function() {
                    updatePetitionerInLegalHeirsTable(index, 'relationship', this.value);
                });
            }
        });
    }

    function updatePetitionerInLegalHeirsTable(petitionerIndex, field, value) {
        const tbody = document.querySelector('#legal-heirs-table tbody');
        if (!tbody) return;
        
        const petitionerRows = tbody.querySelectorAll('tr.petitioner-row');
        const targetRow = petitionerRows[petitionerIndex];
        
        if (targetRow) {
            if (field === 'name') {
                const nameInput = targetRow.querySelector('.petitioner-name-display');
                if (nameInput) {
                    nameInput.value = value;
                }
            } else if (field === 'address') {
                const addressInput = targetRow.querySelector('.petitioner-address-display');
                if (addressInput) {
                    addressInput.value = value;
                }
            } else if (field === 'age') {
                const ageInput = targetRow.querySelector('.petitioner-age-display');
                if (ageInput) {
                    ageInput.value = value;
                }
            } else if (field === 'relationship') {
                const relationshipSelect = targetRow.querySelector('.petitioner-relationship-display');
                if (relationshipSelect) {
                    relationshipSelect.value = value;
                }
            }
        }
    }

    // Manual trigger function for testing
    window.testLegalHeirsTable = function() {
        console.log('Manual test trigger called');
        if (typeof initializeLegalHeirsTable === 'function') {
            initializeLegalHeirsTable();
        } else {
            console.log('Function not available');
        }
    };

    // Manual trigger function for testing buttons
    window.testLegalHeirButtons = function() {
        console.log('Manual button test trigger called');
        setupLegalHeirButtons();
    };

    // Manual trigger function for complete setup
    window.testCompleteSetup = function() {
        console.log('Manual complete setup trigger called');
        setupLegalHeirButtons();
        initializeLegalHeirsTableWithRetry();
    };

    // Manual trigger function to refresh petitioner data
    window.refreshPetitionerData = function() {
        console.log('Refreshing petitioner data in legal heirs table...');
        initializeLegalHeirsTable();
    };

    // Debug function to check petitioner buttons
    window.debugPetitionerButtons = function() {
        console.log('=== DEBUGGING PETITIONER BUTTONS ===');
        const petitionerRows = document.querySelectorAll('#legal-heirs-table tbody tr.petitioner-row');
        console.log('Found petitioner rows:', petitionerRows.length);
        
        petitionerRows.forEach((row, index) => {
            const addSubHeirsBtn = row.querySelector('.add-sub-heirs-btn');
            console.log(`Petitioner row ${index + 1}:`, {
                row: row,
                button: addSubHeirsBtn,
                buttonExists: !!addSubHeirsBtn,
                heirId: addSubHeirsBtn ? addSubHeirsBtn.dataset.heirId : 'N/A',
                isPetitioner: addSubHeirsBtn ? addSubHeirsBtn.dataset.petitioner : 'N/A'
            });
        });
        console.log('=== END DEBUG ===');
    };

    // Debug function to manually trigger button click
    window.testPetitionerButton = function(petitionerIndex = 0) {
        console.log('=== TESTING PETITIONER BUTTON ===');
        const petitionerRows = document.querySelectorAll('#legal-heirs-table tbody tr.petitioner-row');
        if (petitionerRows[petitionerIndex]) {
            const button = petitionerRows[petitionerIndex].querySelector('.add-sub-heirs-btn');
            if (button) {
                console.log('Manually clicking button:', button);
                button.click();
            } else {
                console.log('Button not found');
            }
        } else {
            console.log('Petitioner row not found at index:', petitionerIndex);
        }
    };

    // Debug function to manually test sub-heir creation
    window.testSubHeirCreation = function(heirId = 1, isPetitioner = true) {
        console.log('=== TESTING SUB-HEIR CREATION ===');
        console.log('Heir ID:', heirId, 'Is Petitioner:', isPetitioner);
        addSubLegalHeirsForHeir(heirId, isPetitioner);
    };

    // Debug function to test exhibit functionality
    window.testExhibitFunctionality = function() {
        console.log('=== TESTING EXHIBIT FUNCTIONALITY ===');
        const allExhibitSelects = document.querySelectorAll('.exhibit-select, .son-exhibit-select');
        console.log('Found exhibit selects:', allExhibitSelects.length);
        
        allExhibitSelects.forEach((select, index) => {
            console.log(`Select ${index + 1}:`, {
                value: select.value,
                previousValue: select.dataset.previousValue,
                className: select.className,
                options: Array.from(select.options).map(opt => ({
                    value: opt.value,
                    text: opt.textContent,
                    disabled: opt.disabled,
                    display: opt.style.display
                }))
            });
        });
    };

    // Debug function to check current state
    window.debugCurrentState = function() {
        console.log('=== DEBUG CURRENT STATE ===');
        
        // Check global variables
        console.log('Global variables - legalHeirCounter:', legalHeirCounter, 'subHeirCounter:', subHeirCounter);
        
        // Check table
        const table = document.querySelector('#legal-heirs-table');
        console.log('Legal heirs table found:', !!table);
        
        const tbody = document.querySelector('#legal-heirs-table tbody');
        console.log('Table body found:', !!tbody);
        
        if (tbody) {
            const rows = tbody.querySelectorAll('tr');
            console.log('Number of rows in table:', rows.length);
        }
        
        // Check petitioner blocks
        const petitionerBlocks = document.querySelectorAll('.petitioner_block');
        console.log('Number of petitioner blocks:', petitionerBlocks.length);
        
        petitionerBlocks.forEach((block, index) => {
            const nameInput = block.querySelector('input[placeholder="Enter Petitioner Name"]');
            const addressInput = block.querySelector('textarea[placeholder="Enter Petitioner Address"]');
            console.log(`Petitioner ${index + 1}:`, {
                nameInput: !!nameInput,
                nameValue: nameInput ? nameInput.value : 'N/A',
                namePlaceholder: nameInput ? nameInput.placeholder : 'N/A',
                addressInput: !!addressInput,
                addressValue: addressInput ? addressInput.value : 'N/A',
                addressPlaceholder: addressInput ? addressInput.placeholder : 'N/A'
            });
        });
        
        // Check buttons
        const addMoreBtn = document.getElementById('add-more-legal-heir');
        const addSubBtn = document.getElementById('add-sub-legal-heir');
        console.log('Add More Legal Heir button found:', !!addMoreBtn);
        console.log('Add Sub Legal Heir button found:', !!addSubBtn);
        
        console.log('=== END DEBUG ===');
    };

    function addMoreLegalHeir() {
        console.log('Add More Legal Heir button clicked');
        console.log('Current legalHeirCounter before increment:', legalHeirCounter);
        legalHeirCounter++;
        console.log('Current legalHeirCounter after increment:', legalHeirCounter);
        const tbody = document.querySelector('#legal-heirs-table tbody');
        if (!tbody) {
            console.log('Table body not found for adding legal heir');
            return;
        }
        const newRow = document.createElement('tr');
        newRow.className = 'legal-heir-row';
        newRow.dataset.heirId = legalHeirCounter;
        
        newRow.innerHTML = `
            <td class="border border-white p-2 text-center">${legalHeirCounter}</td>
            <td class="border border-white p-2">
                <div class="space-y-2">
                    <input type="text" placeholder="LEGAL HEIR FULL NAME" class="w-full input border p-1 border-white rounded legal-heir-name">
                    
                    <!-- Address Field (Always Visible) -->
                    <div class="mt-2">
                        <label class="text-white text-sm">Address:</label>
                        <input type="text" placeholder="Enter Address" class="w-full input border p-1 border-white rounded mt-1 legal-heir-address" id="address_input_${legalHeirCounter}">
                    </div>
                    
                    <div class="flex items-center gap-4 mt-2">
                        <label class="text-white text-sm">
                            <input type="radio" name="alive_died_${legalHeirCounter}" value="alive" class="mr-1 alive-died-radio"> Alive
                        </label>
                        <label class="text-white text-sm">
                            <input type="radio" name="alive_died_${legalHeirCounter}" value="died" class="mr-1 alive-died-radio"> Died
                        </label>
                    </div>
                    <div class="alive-details hidden" id="alive_details_${legalHeirCounter}">
                        <!-- Additional alive-specific fields can go here if needed -->
                    </div>
                    <div class="died-details hidden" id="died_details_${legalHeirCounter}">
                        <div class="flex items-center gap-4 mt-2">
                            <label class="text-white text-sm">
                                <input type="radio" name="deceased_type_${legalHeirCounter}" value="since_deceased" class="mr-1"> Since deceased
                            </label>
                            <label class="text-white text-sm">
                                <input type="radio" name="deceased_type_${legalHeirCounter}" value="predeceased" class="mr-1"> Predeceased
                            </label>
                        </div>
                        <!-- Address field removed - now using general address field above -->
                        <div class="mt-2">
                            <label class="text-white text-sm">Died on:</label>
                            <input type="date" class="border p-1 border-white rounded ml-2 died-date" style="background-color: #334155; color: white;">
                        </div>
                        <button type="button" class="add-sub-heirs-btn bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600 mt-2 hidden" data-heir-id="${legalHeirCounter}">
                            + Add Sub Legal Heirs
                        </button>
                    </div>
                </div>
            </td>
            <td class="border border-white p-2">
                <div class="age-field-container text-center">
                    <input type="number" placeholder="Age of Legal Heir" class="w-full border p-1 border-white input rounded age-input" id="age_input_${legalHeirCounter}">
                    <span class="age-dots text-center text-white text-lg hidden" id="age_dots_${legalHeirCounter}">- - - </span>
                </div>
            </td>
            <td class="border border-white p-2">
                 <select class="border p-1 mt-2 border-black bg-[#334155] text-white rounded w-full">
                                        <option value="">Select Relation to Deceased</option>
                                        <option value="Widow">Widow</option>
                                        <option value="Widower">Widower</option>
                                        <option value="Son">Son</option>
                                        <option value="Daughter">Daughter</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Father">Father</option>
                                        <option value="Brother">Brother</option>
                                        <option value="Sister">Sister</option>
                                        <option value="Grandson">Grandson</option>
                                        <option value="Granddaughter">Granddaughter</option>
                                        <option value="Uncle">Uncle</option>
                                        <option value="Aunt">Aunt</option>
                                        <option value="Nephew">Nephew</option>
                                        <option value="Niece">Niece</option>
                                        <option value="Cousin">Cousin</option>
                                        <option value="Cousin">Married Daughter</option>
                                        <option value="Married Granddaughter">Married Granddaughter</option>
                                        <option value="Married Sister">Married Sister</option>
                                        <option value="Married Sister">Married Niece</option>
                                        <option value="Married Sister">Daughter in Law</option>
                                        <option value="Married Sister">Minor Son</option>
                                        <option value="Married Sister">Minor Daughter</option>
                                        <option value="Other"> Brother in Law</option>
                                        <option value="Other"> Sister in Law</option>
                                    </select>
            </td>
            <td class="border border-white p-2 text-center">
                <button type="button" class="remove-row-btn bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Remove</button>
            </td>
        `;
        
        // For main legal heirs, append to the end is correct behavior
        
        // Add event listeners for alive/died radio buttons
        const aliveDiedRadios = newRow.querySelectorAll('.alive-died-radio');
        aliveDiedRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const aliveDetails = document.getElementById(`alive_details_${legalHeirCounter}`);
                const diedDetails = document.getElementById(`died_details_${legalHeirCounter}`);
                const ageInput = document.getElementById(`age_input_${legalHeirCounter}`);
                const ageDots = document.getElementById(`age_dots_${legalHeirCounter}`);
                const addressInput = document.getElementById(`address_input_${legalHeirCounter}`);
                
                if (this.value === 'alive') {
                    aliveDetails.classList.remove('hidden');
                    diedDetails.classList.add('hidden');
                    // Show age input, hide dots
                    if (ageInput) ageInput.classList.remove('hidden');
                    if (ageDots) ageDots.classList.add('hidden');
                } else if (this.value === 'died') {
                    aliveDetails.classList.add('hidden');
                    diedDetails.classList.remove('hidden');
                    addressInput.classList.add('hidden');
                    // Hide age input, show dots
                    if (ageInput) ageInput.classList.add('hidden');
                    if (ageDots) ageDots.classList.remove('hidden');
                } else {
                    aliveDetails.classList.add('hidden');
                    diedDetails.classList.add('hidden');
                    // Hide both age input and dots
                    if (ageInput) ageInput.classList.add('hidden');
                    if (ageDots) ageDots.classList.add('hidden');
                }
            });
        });
        tbody.appendChild(newRow);
        subHeirCounter = 0; // Reset sub-heir counter when adding new main heir
        
        // Add event listeners
        setupLegalHeirRowEvents(newRow);
    }

    function setupLegalHeirRowEvents(row) {
        // Add event listener to the remove button
        const removeBtn = row.querySelector('.remove-row-btn');
        removeBtn.addEventListener('click', function() {
            row.remove();
            updateRowNumbers();
        });

        // Add event listeners for alive/died radio buttons
        const aliveDiedRadios = row.querySelectorAll('.alive-died-radio');
        aliveDiedRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const heirId = row.dataset.heirId;
                const diedDetails = document.getElementById(`died_details_${heirId}`);
                const aliveDetails = document.getElementById(`alive_details_${heirId}`);
                const ageInput = document.getElementById(`age_input_${heirId}`);
                const ageDots = document.getElementById(`age_dots_${heirId}`);
                const addSubHeirsBtn = row.querySelector('.add-sub-heirs-btn');
                
                if (this.value === 'died') {
                    diedDetails.classList.remove('hidden');
                    aliveDetails.classList.add('hidden');
                    // Hide age input and show dots for dead person
                    if (ageInput) ageInput.classList.add('hidden');
                    if (ageDots) ageDots.classList.remove('hidden');
                    // Show the Add Sub Legal Heirs button
                    if (addSubHeirsBtn) addSubHeirsBtn.classList.remove('hidden');
                } else if (this.value === 'alive') {
                    diedDetails.classList.add('hidden');
                    aliveDetails.classList.remove('hidden');
                    // Show age input and hide dots for alive person
                    if (ageInput) ageInput.classList.remove('hidden');
                    if (ageDots) ageDots.classList.add('hidden');
                    // Show the Add Sub Legal Heirs button
                    if (addSubHeirsBtn) addSubHeirsBtn.classList.remove('hidden');
                } else {
                    diedDetails.classList.add('hidden');
                    aliveDetails.classList.add('hidden');
                    // Hide age input and dots when nothing is selected
                    if (ageInput) ageInput.classList.add('hidden');
                    if (ageDots) ageDots.classList.add('hidden');
                    // Hide the Add Sub Legal Heirs button
                    if (addSubHeirsBtn) addSubHeirsBtn.classList.add('hidden');
                }
            });
        });

        // Event listener for sub-heirs button is handled by delegation
        // No need to add direct event listener here
    }

    function addSubLegalHeir() {
        console.log('Add Sub Legal Heir button clicked');
        console.log('Current subHeirCounter before increment:', subHeirCounter);
        subHeirCounter++;
        console.log('Current subHeirCounter after increment:', subHeirCounter);
        const tbody = document.querySelector('#legal-heirs-table tbody');
        if (!tbody) {
            console.log('Table body not found for adding sub legal heir');
            return;
        }
        const newRow = document.createElement('tr');
        
        // Get the current main heir number
        const currentMainHeir = legalHeirCounter;
        const subHeirNumber = `${currentMainHeir}(${String.fromCharCode(96 + subHeirCounter)})`; // a, b, c, etc.
        
        newRow.innerHTML = `
            <td class="border border-white p-2 text-center">${subHeirNumber}</td>
            <td class="border border-white p-2">
                <div class="space-y-2">
                    <input type="text" placeholder="Name of Sub Legal Heir" class="w-full input border p-1 border-white rounded">
                    <input type="text" placeholder="Residing at" class="w-full input border p-1 border-white rounded">
                    <input type="text" placeholder="Address of Sub Legal Heir" class="w-full input border p-1 border-white rounded">
                </div>
            </td>
            <td class="border border-white p-2">
                <input type="number" placeholder="Age of Sub Legal Heir" class="w-full border p-1 border-white input rounded">
            </td>
            <td class="border border-white p-2">
                <select class="border p-1 mt-2 border-black bg-[#334155] text-white rounded w-full">
                                        <option value="">Select Relation to Deceased</option>
                                        <option value="Widow">Widow</option>
                                        <option value="Widower">Widower</option>
                                        <option value="Son">Son</option>
                                        <option value="Daughter">Daughter</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Father">Father</option>
                                        <option value="Brother">Brother</option>
                                        <option value="Sister">Sister</option>
                                        <option value="Grandson">Grandson</option>
                                        <option value="Granddaughter">Granddaughter</option>
                                        <option value="Uncle">Uncle</option>
                                        <option value="Aunt">Aunt</option>
                                        <option value="Nephew">Nephew</option>
                                        <option value="Niece">Niece</option>
                                        <option value="Cousin">Cousin</option>
                                        <option value="Cousin">Married Daughter</option>
                                        <option value="Married Granddaughter">Married Granddaughter</option>
                                        <option value="Married Sister">Married Sister</option>
                                        <option value="Married Sister">Married Niece</option>
                                        <option value="Married Sister">Daughter in Law</option>
                                        <option value="Married Sister">Minor Son</option>
                                        <option value="Married Sister">Minor Daughter</option>
                                        <option value="Other"> Brother in Law</option>
                                        <option value="Other"> Sister in Law</option>
                                    </select>
            </td>
            <td class="border border-white p-2 text-center">
                <button type="button" class="remove-row-btn bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Remove</button>
            </td>
        `;
        
        tbody.appendChild(newRow);
        
        // Add event listener to the remove button
        const removeBtn = newRow.querySelector('.remove-row-btn');
        removeBtn.addEventListener('click', function() {
            newRow.remove();
            updateRowNumbers();
        });
    }

    function addSubLegalHeirsForHeir(heirId, isPetitioner = false) {
        console.log('Adding sub legal heirs for heir ID:', heirId, 'isPetitioner:', isPetitioner);
        const tbody = document.querySelector('#legal-heirs-table tbody');
        if (!tbody) return;
        
        // Get the legal heir name for reference
        let heirRow, heirNameInput, heirName;
        if (isPetitioner) {
            // For petitioners, find the petitioner row by checking the first cell content
            const petitionerRows = tbody.querySelectorAll('tr.petitioner-row');
            console.log('Found petitioner rows:', petitionerRows.length);
            
            // Find the petitioner row with the matching number
            heirRow = null;
            petitionerRows.forEach((row, index) => {
                const firstCell = row.querySelector('td:first-child');
                if (firstCell && firstCell.textContent.trim() === heirId.toString()) {
                    heirRow = row;
                    console.log('Found petitioner row for heir ID:', heirId, 'at index:', index);
                }
            });
            
            heirNameInput = heirRow ? heirRow.querySelector('.petitioner-name-display') : null;
            heirName = heirNameInput ? heirNameInput.value : `Petitioner ${heirId}`;
            console.log('Petitioner row found:', !!heirRow, 'Name:', heirName);
        } else {
            // For regular legal heirs
            heirRow = document.querySelector(`tr[data-heir-id="${heirId}"]`);
            heirNameInput = heirRow ? heirRow.querySelector('.legal-heir-name') : null;
            heirName = heirNameInput ? heirNameInput.value : `Heir ${heirId}`;
        }
        
        // Create sub-heir row
        const newRow = document.createElement('tr');
        newRow.className = 'sub-heir-row';
        newRow.dataset.parentHeirId = heirId;
        newRow.dataset.isPetitioner = isPetitioner;
        
        // Generate sub-heir number (2(a), 2(b), etc.)
        const existingSubHeirs = tbody.querySelectorAll(`tr[data-parent-heir-id="${heirId}"]`);
        const subHeirLetter = String.fromCharCode(97 + existingSubHeirs.length); // a, b, c, etc.
        const subHeirNumber = `${heirId}(${subHeirLetter})`;
        
        newRow.innerHTML = `
            <td class="border border-white p-2 text-center">${subHeirNumber}</td>
            <td class="border border-white p-2">
                <div class="space-y-2">
                
                <br>
                    <input type="text" placeholder="SUB LEGAL HEIR FULL NAME" class="w-full input border p-1 border-white rounded sub-heir-name">
                    
                    <!-- Address Field (Initially Visible) -->
                    <div class="mt-2 sub-address-container">
                        <label class="text-white text-sm">Address:</label>
                        <input type="text" placeholder="Enter Address" class="w-full input border p-1 border-white rounded mt-1 sub-heir-address">
                    </div>
                    
                    <div class="flex items-center gap-4 mt-2">
                        <label class="text-white text-sm">Alive or Died:</label>
                        <label class="text-white text-sm">
                            <input type="radio" name="sub_alive_died_${heirId}_${subHeirLetter}" value="alive" class="mr-1 sub-alive-died-radio"> Alive
                        </label>
                        <label class="text-white text-sm">
                            <input type="radio" name="sub_alive_died_${heirId}_${subHeirLetter}" value="died" class="mr-1 sub-alive-died-radio"> Died
                        </label>
                    </div>
                    
                    <!-- Alive details section -->
                    <div class="sub-alive-details hidden" id="sub_alive_details_${heirId}_${subHeirLetter}">
                        <!-- Additional alive-specific fields can go here if needed -->
                    </div>
                    <div class="sub-died-details hidden" id="sub_died_details_${heirId}_${subHeirLetter}">
                        <div class="flex items-center gap-4 mt-2">
                            <label class="text-white text-sm">
                                <input type="radio" name="sub_deceased_type_${heirId}_${subHeirLetter}" value="since_deceased" class="mr-1"> Since deceased
                            </label>
                            <label class="text-white text-sm">
                                <input type="radio" name="sub_deceased_type_${heirId}_${subHeirLetter}" value="predeceased" class="mr-1"> Predeceased
                            </label>
                        </div>
                        <!-- Address field removed - now using general address field above -->
                        <div class="mt-2">
                            <label class="text-white text-sm">Died on:</label>
                            <input type="date" class="border text-white p-1  bg-[#334155] text-black
                              rounded ml-2 " stlye="background: #334155; 
    color: white;
">
                        </div>
                        </div>
                        <button type="button" class="add-sub-sub-heirs-btn bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600 mt-2 hidden" data-parent-heir-id="${heirId}" data-sub-heir-id="${subHeirLetter}">
                            + Add Sub-Sub Legal Heirs
                        </button>
                </div>
            </td>
            <td class="border border-white p-2">
                <div class="age-field-container text-center">
                    <input type="number" placeholder="Age of Sub Legal Heir" class="w-full border p-1 border-white input rounded age-input">
                    <span class="age-dots text-center text-white text-lg hidden">- - -</span>
                </div>
            </td>
            <td class="border border-white p-2">
                     <select class="border p-1 mt-2 border-black bg-[#334155] text-white rounded w-full">
                                        <option value="">Select Relation to Deceased</option>
                                        <option value="Widow">Widow</option>
                                        <option value="Widower">Widower</option>
                                        <option value="Son">Son</option>
                                        <option value="Daughter">Daughter</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Father">Father</option>
                                        <option value="Brother">Brother</option>
                                        <option value="Sister">Sister</option>
                                        <option value="Grandson">Grandson</option>
                                        <option value="Granddaughter">Granddaughter</option>
                                        <option value="Uncle">Uncle</option>
                                        <option value="Aunt">Aunt</option>
                                        <option value="Nephew">Nephew</option>
                                        <option value="Niece">Niece</option>
                                        <option value="Cousin">Cousin</option>
                                        <option value="Cousin">Married Daughter</option>
                                        <option value="Married Granddaughter">Married Granddaughter</option>
                                        <option value="Married Sister">Married Sister</option>
                                        <option value="Married Sister">Married Niece</option>
                                        <option value="Married Sister">Daughter in Law</option>
                                        <option value="Married Sister">Minor Son</option>
                                        <option value="Married Sister">Minor Daughter</option>
                                        <option value="Other"> Brother in Law</option>
                                        <option value="Other"> Sister in Law</option>
                                    </select>
            </td>
            <td class="border border-white p-2 text-center">
                <button type="button" class="remove-row-btn bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Remove</button>
            </td>
        `;
        
        // Insert the sub-heir row after the parent row (and any existing sub-heirs)
        let insertAfterRow = heirRow;
        
        if (isPetitioner) {
            // For petitioners, find the last sub-heir of this petitioner to insert after
            const existingSubHeirs = tbody.querySelectorAll(`tr[data-parent-heir-id="${heirId}"][data-is-petitioner="true"]`);
            if (existingSubHeirs.length > 0) {
                insertAfterRow = existingSubHeirs[existingSubHeirs.length - 1];
            }
        } else {
            // For regular legal heirs, find the last sub-heir of this heir
            const existingSubHeirs = tbody.querySelectorAll(`tr[data-parent-heir-id="${heirId}"]`);
            if (existingSubHeirs.length > 0) {
                insertAfterRow = existingSubHeirs[existingSubHeirs.length - 1];
            }
        }
        
        console.log('Inserting new sub-heir row after:', insertAfterRow);
        
        // Insert the new row after the determined position
        if (insertAfterRow && insertAfterRow.nextSibling) {
            tbody.insertBefore(newRow, insertAfterRow.nextSibling);
        } else if (insertAfterRow) {
            // If no next sibling, append after the parent
            insertAfterRow.parentNode.insertBefore(newRow, insertAfterRow.nextElementSibling);
        } else {
            // Fallback: append to end
            tbody.appendChild(newRow);
        }
        console.log('Sub-heir row added successfully');
        
        // Add event listeners for sub-heir row
        setupSubHeirRowEvents(newRow);
        console.log('Sub-heir row events set up');
    }

    function setupSubHeirRowEvents(row) {
        // Add event listener to the remove button
        const removeBtn = row.querySelector('.remove-row-btn');
        removeBtn.addEventListener('click', function() {
            row.remove();
            updateRowNumbers();
        });

        // Add event listeners for sub-heir alive/died radio buttons
        const aliveDiedRadios = row.querySelectorAll('.sub-alive-died-radio');
        aliveDiedRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const parentHeirId = row.dataset.parentHeirId;
                const subHeirId = row.querySelector('.add-sub-sub-heirs-btn').dataset.subHeirId;
                const aliveDetails = document.getElementById(`sub_alive_details_${parentHeirId}_${subHeirId}`);
                const diedDetails = document.getElementById(`sub_died_details_${parentHeirId}_${subHeirId}`);
                const addSubSubHeirsBtn = row.querySelector('.add-sub-sub-heirs-btn');
                const ageInput = row.querySelector('.age-input');
                const ageDots = row.querySelector('.age-dots');
                
                if (this.value === 'alive') {
                    aliveDetails.classList.remove('hidden');
                    diedDetails.classList.add('hidden');
                    addSubSubHeirsBtn.classList.remove('hidden');
                    // Show age input, hide dots
                    if (ageInput) ageInput.classList.remove('hidden');
                    if (ageDots) ageDots.classList.add('hidden');
                    // Show address field when alive
                    const addressContainer = row.querySelector('.sub-address-container');
                    if (addressContainer) addressContainer.classList.remove('hidden');
                } else if (this.value === 'died') {
                    aliveDetails.classList.add('hidden');
                    diedDetails.classList.remove('hidden');
                    addSubSubHeirsBtn.classList.remove('hidden');
                    // Hide age input, show dots
                    if (ageInput) ageInput.classList.add('hidden');
                    if (ageDots) ageDots.classList.remove('hidden');
                    // Hide address field when died
                    const addressContainer = row.querySelector('.sub-address-container');
                    if (addressContainer) addressContainer.classList.add('hidden');
                } else {
                    aliveDetails.classList.add('hidden');
                    diedDetails.classList.add('hidden');
                    addSubSubHeirsBtn.classList.add('hidden');
                    // Hide both age input and dots
                    if (ageInput) ageInput.classList.add('hidden');
                    if (ageDots) ageDots.classList.add('hidden');
                }
            });
        });

        // Add event listener for sub-sub-heirs button
        const addSubSubHeirsBtn = row.querySelector('.add-sub-sub-heirs-btn');
        if (addSubSubHeirsBtn) {
            addSubSubHeirsBtn.addEventListener('click', function() {
                const parentHeirId = this.dataset.parentHeirId;
                const subHeirId = this.dataset.subHeirId;
                const isPetitioner = row.dataset.isPetitioner === 'true';
                addSubSubLegalHeirsForHeir(parentHeirId, subHeirId, isPetitioner);
            });
        }
    }

    function addSubSubLegalHeirsForHeir(parentHeirId, subHeirId, isPetitioner = false) {
        console.log('Adding sub-sub legal heirs for parent heir ID:', parentHeirId, 'sub heir ID:', subHeirId, 'isPetitioner:', isPetitioner);
        const tbody = document.querySelector('#legal-heirs-table tbody');
        if (!tbody) return;
        
        // Create sub-sub-heir row
        const newRow = document.createElement('tr');
        newRow.className = 'sub-sub-heir-row';
        newRow.dataset.parentHeirId = parentHeirId;
        newRow.dataset.subHeirId = subHeirId;
        newRow.dataset.isPetitioner = isPetitioner;
        
        // Generate sub-sub-heir number (2(a)(i), 2(a)(ii), etc.)
        const existingSubSubHeirs = tbody.querySelectorAll(`tr[data-parent-heir-id="${parentHeirId}"][data-sub-heir-id="${subHeirId}"]`);
        const subSubHeirNumber = existingSubSubHeirs.length + 1;
        const romanNumeral = numberToRoman(subSubHeirNumber);
        const fullSubSubHeirNumber = `${parentHeirId}(${subHeirId})(${romanNumeral})`;
        
        newRow.innerHTML = `
            <td class="border border-white p-2 text-center">${fullSubSubHeirNumber}</td>
            <td class="border border-white p-2">
                <div class="space-y-2">
                    <input type="text" placeholder="SUB-SUB LEGAL HEIR FULL NAME" class="w-full input border p-1 border-white rounded sub-sub-heir-name">
                    
                    <!-- Address Field (Initially Visible) -->
                    <div class="mt-2 sub-sub-address-container">
                        <label class="text-white text-sm">Address:</label>
                        <input type="text" placeholder="Enter Address" class="w-full input border p-1 border-white rounded mt-1 sub-sub-heir-address">
                    </div>
                    
                    <div class="flex items-center gap-4 mt-2">
                        <label class="text-white text-sm">Alive or Died:</label>
                        <label class="text-white text-sm">
                            <input type="radio" name="sub_sub_alive_died_${parentHeirId}_${subHeirId}_${subSubHeirNumber}" value="alive" class="mr-1 sub-sub-alive-died-radio"> Alive
                        </label>
                        <label class="text-white text-sm">
                            <input type="radio" name="sub_sub_alive_died_${parentHeirId}_${subHeirId}_${subSubHeirNumber}" value="died" class="mr-1 sub-sub-alive-died-radio"> Died
                        </label>
                    </div>
                    
                    <!-- Alive details section -->
                    <div class="sub-sub-alive-details hidden" id="sub_sub_alive_details_${parentHeirId}_${subHeirId}_${subSubHeirNumber}">
                        <!-- Additional alive-specific fields can go here if needed -->
                    </div>
                    <div class="sub-sub-died-details hidden" id="sub_sub_died_details_${parentHeirId}_${subHeirId}_${subSubHeirNumber}">
                        <div class="flex items-center gap-4 mt-2">
                            <label class="text-white text-sm">
                                <input type="radio" name="sub_sub_deceased_type_${parentHeirId}_${subHeirId}_${subSubHeirNumber}" value="since_deceased" class="mr-1"> Since deceased
                            </label>
                            <label class="text-white text-sm">
                                <input type="radio" name="sub_sub_deceased_type_${parentHeirId}_${subHeirId}_${subSubHeirNumber}" value="predeceased" class="mr-1"> Predeceased
                            </label>
                        </div>
                        <!-- Address field removed - now using general address field above -->
                        <div class="mt-2">
                            <label class="text-white text-sm">Died on:</label>
                            <div class="date-field-container">
                                <input type="date" class="border p-1 border-white rounded ml-2 sub-sub-died-date date-input">
                                <span class="date-dots text-center text-white text-lg hidden">- - -</span>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td class="border border-white p-2">
                <div class="age-field-container text-center">
                    <input type="number" placeholder="Age of Sub-Sub Legal Heir" class="w-full border p-1 border-white input rounded age-input">
                    <span class="age-dots text-center text-white text-lg hidden">- - -</span>
                </div>
            </td>
            <td class="border border-white p-2">
 <select class="border p-1 mt-2 border-black bg-[#334155] text-white rounded w-full">
                                        <option value="">Select Relation to Deceased</option>
                                        <option value="Widow">Widow</option>
                                        <option value="Widower">Widower</option>
                                        <option value="Son">Son</option>
                                        <option value="Daughter">Daughter</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Father">Father</option>
                                        <option value="Brother">Brother</option>
                                        <option value="Sister">Sister</option>
                                        <option value="Grandson">Grandson</option>
                                        <option value="Granddaughter">Granddaughter</option>
                                        <option value="Uncle">Uncle</option>
                                        <option value="Aunt">Aunt</option>
                                        <option value="Nephew">Nephew</option>
                                        <option value="Niece">Niece</option>
                                        <option value="Cousin">Cousin</option>
                                        <option value="Cousin">Married Daughter</option>
                                        <option value="Married Granddaughter">Married Granddaughter</option>
                                        <option value="Married Sister">Married Sister</option>
                                        <option value="Married Sister">Married Niece</option>
                                        <option value="Married Sister">Daughter in Law</option>
                                        <option value="Married Sister">Minor Son</option>
                                        <option value="Married Sister">Minor Daughter</option>
                                        <option value="Other"> Brother in Law</option>
                                        <option value="Other"> Sister in Law</option>
                                    </select>
            </td>
            <td class="border border-white p-2 text-center">
                <button type="button" class="remove-row-btn bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Remove</button>
            </td>
        `;
        
        // Insert the sub-sub-heir row after the parent sub-heir row (and any existing sub-sub-heirs)
        let insertAfterRow = null;
        
        // Find the parent sub-heir row
        const subHeirRows = tbody.querySelectorAll(`tr[data-parent-heir-id="${parentHeirId}"].sub-heir-row`);
        subHeirRows.forEach(row => {
            const button = row.querySelector('.add-sub-sub-heirs-btn');
            if (button && button.dataset.subHeirId === subHeirId) {
                insertAfterRow = row;
            }
        });
        
        if (insertAfterRow) {
            // Find the last sub-sub-heir of this sub-heir to insert after
            const existingSubSubHeirs = tbody.querySelectorAll(`tr[data-parent-heir-id="${parentHeirId}"][data-sub-heir-id="${subHeirId}"].sub-sub-heir-row`);
            if (existingSubSubHeirs.length > 0) {
                insertAfterRow = existingSubSubHeirs[existingSubSubHeirs.length - 1];
            }
            
            // Insert the new row after the determined position
            if (insertAfterRow.nextElementSibling) {
                tbody.insertBefore(newRow, insertAfterRow.nextElementSibling);
            } else {
                tbody.appendChild(newRow);
            }
        } else {
            // Fallback: append to end
            tbody.appendChild(newRow);
        }
        
        // Add event listeners for sub-sub-heir row
        setupSubSubHeirRowEvents(newRow);
    }

    function setupSubSubHeirRowEvents(row) {
        // Add event listener to the remove button
        const removeBtn = row.querySelector('.remove-row-btn');
        removeBtn.addEventListener('click', function() {
            row.remove();
            updateRowNumbers();
        });

        // Add event listeners for sub-sub-heir alive/died radio buttons
        const aliveDiedRadios = row.querySelectorAll('.sub-sub-alive-died-radio');
        aliveDiedRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const parentHeirId = row.dataset.parentHeirId;
                const subHeirId = row.dataset.subHeirId;
                const cellText = row.querySelector('td:first-child').textContent;
                const match = cellText.match(/^(\d+)\(([a-z])\)\(([ivx]+)\)$/);
                const subSubHeirNumber = match ? match[3] : '1';
                const aliveDetails = document.getElementById(`sub_sub_alive_details_${parentHeirId}_${subHeirId}_${subSubHeirNumber}`);
                const diedDetails = document.getElementById(`sub_sub_died_details_${parentHeirId}_${subHeirId}_${subSubHeirNumber}`);
                                    const ageInput = row.querySelector('.age-input');
                    const ageDots = row.querySelector('.age-dots');
                    const dateInput = row.querySelector('.date-input');
                    const dateDots = row.querySelector('.date-dots');
                    
                    if (this.value === 'alive') {
                        if (aliveDetails) aliveDetails.classList.remove('hidden');
                        if (diedDetails) diedDetails.classList.add('hidden');
                        // Show age input, hide dots
                        if (ageInput) ageInput.classList.remove('hidden');
                        if (ageDots) ageDots.classList.add('hidden');
                        // Show date input, hide dots
                        if (dateInput) dateInput.classList.remove('hidden');
                        if (dateDots) dateDots.classList.add('hidden');
                        // Show address field when alive
                        const addressContainer = row.querySelector('.sub-sub-address-container');
                        if (addressContainer) addressContainer.classList.remove('hidden');
                    } else if (this.value === 'died') {
                        if (aliveDetails) aliveDetails.classList.add('hidden');
                        if (diedDetails) diedDetails.classList.remove('hidden');
                        // Hide age input, show dots
                        if (ageInput) ageInput.classList.add('hidden');
                        if (ageDots) ageDots.classList.remove('hidden');
                        // Hide date input, show dots
                        if (dateInput) dateInput.classList.add('hidden');
                        if (dateDots) dateDots.classList.remove('hidden');
                        // Hide address field when died
                        const addressContainer = row.querySelector('.sub-sub-address-container');
                        if (addressContainer) addressContainer.classList.add('hidden');
                    } else {
                        if (aliveDetails) aliveDetails.classList.add('hidden');
                        if (diedDetails) diedDetails.classList.add('hidden');
                        // Hide both age input and dots
                        if (ageInput) ageInput.classList.add('hidden');
                        if (ageDots) ageDots.classList.add('hidden');
                        // Hide both date input and dots
                        if (dateInput) dateInput.classList.add('hidden');
                        if (dateDots) dateDots.classList.add('hidden');
                    }
            });
        });
    }

    function updateRowNumbers() {
        const tbody = document.querySelector('#legal-heirs-table tbody');
        const petitionerRows = tbody.querySelectorAll('tr.petitioner-row');
        const otherRows = tbody.querySelectorAll('tr:not(.petitioner-row)');
        
        // Update petitioner row numbers
        petitionerRows.forEach((row, index) => {
            const firstCell = row.querySelector('td:first-child');
            if (firstCell) {
                // Check if this petitioner has a parent
                const hasParent = tbody.querySelector(`tr.parent-row[data-petitioner-index="${index}"]`);
                if (hasParent) {
                    // This petitioner has a parent, show (a) suffix
                    firstCell.textContent = `${index + 1}(a)`;
                } else {
                    // This petitioner has no parent, show regular number
                    firstCell.textContent = index + 1;
                }
            }
            
            // Update reference text for multiple petitioners
            const referenceCell = row.querySelector('.petitioner-reference-text');
            if (referenceCell) {
                if (petitionerRows.length === 1) {
                    referenceCell.textContent = '(The Petitioner herein)';
                } else {
                    referenceCell.textContent = `(The Petitioner No.${index + 1} herein)`;
                }
            }
        });
        
        // Update other legal heir rows (non-petitioner rows)
        let mainHeirCount = petitionerRows.length;
        let currentMainHeir = mainHeirCount;
        let subHeirCounts = {}; // Track sub-heir counts for each main heir

        otherRows.forEach((row) => {
            const firstCell = row.querySelector('td:first-child');
            const currentText = firstCell.textContent.trim();
            
            // Skip parent rows - they should keep their original numbering
            if (row.classList.contains('parent-row')) {
                return;
            }
            
            // Check if this is a main heir (just a number)
            if (/^\d+$/.test(currentText)) {
                // This is a main heir
                mainHeirCount++;
                currentMainHeir = mainHeirCount;
                subHeirCounts[currentMainHeir] = 0;
                firstCell.textContent = mainHeirCount;
            } else if (currentText.includes('(') && currentText.includes(')')) {
                // This is a sub-heir or sub-sub-heir
                const match = currentText.match(/^(\d+)\(([a-z])\)(?:\(([ivx]+)\))?$/);
                if (match) {
                    const mainHeirNum = parseInt(match[1]);
                    const subHeirLetter = match[2];
                    const subSubHeirRoman = match[3];
                    
                    if (subSubHeirRoman) {
                        // This is a sub-sub-heir: 2(a)(i)
                        firstCell.textContent = `${mainHeirNum}(${subHeirLetter})(${subSubHeirRoman})`;
                    } else {
                        // This is a sub-heir: 2(a)
                        firstCell.textContent = `${mainHeirNum}(${subHeirLetter})`;
                    }
                }
            }
        });

        // Update the global counters
        legalHeirCounter = mainHeirCount;
        // subHeirCounter is already properly managed globally
    }

    // Sons functionality
    let sonCounter = 1; // Starting from 1 since we now have only 1 son

    function addSon() {
        sonCounter++;
        const container = document.getElementById('sons-container');
        const newSonEntry = document.createElement('div');
        
        newSonEntry.className = 'son-entry border border-gray-300 p-3 rounded mb-2';
        newSonEntry.innerHTML = `
            <div class="flex items-center gap-2 mb-2">
                <span class="son-number">${sonCounter})</span>
                Master <input type="text" placeholder="Enter Son's Name" class="border p-1 border-black input rounded w-48">
                who was born on <input type="date" class="border input p-1 border-black rounded">
                <button type="button" class="remove-son-btn input bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Remove</button>
            </div>
            <div class="flex items-center gap-2">
                Hereto annexed and marked as Exhibit – "<select class="border input p-1 border-black rounded w-12 son-exhibit-select">
                    <option value="">Select</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                    <option value="H">H</option>
                    <option value="I">I</option>
                    <option value="J">J</option>
                    <option value="custom">OTHERS</option>
                </select><input type="text" placeholder="Custom" class="border input p-1 border-black rounded w-12 hidden son-custom-exhibit-input">" is the true copy of birth certificate.
            </div>
        `;
        
        container.appendChild(newSonEntry);
        
        // Add event listener to the new remove button
        const removeBtn = newSonEntry.querySelector('.remove-son-btn');
        removeBtn.addEventListener('click', function() {
            newSonEntry.remove();
            updateSonNumbers();
        });

        // Setup exhibit functionality for the new son entry
        setupExhibitSelects();
    }

    function setupSonRemoveButtons() {
        const removeButtons = document.querySelectorAll('.remove-son-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const sonEntry = button.closest('.son-entry');
                sonEntry.remove();
                updateSonNumbers();
            });
        });
    }

    function updateSonNumbers() {
        const sonEntries = document.querySelectorAll('.son-entry');
        sonEntries.forEach((entry, index) => {
            const numberSpan = entry.querySelector('.son-number');
            if (numberSpan) {
                numberSpan.textContent = `${index + 1})`;
            }
        });
        sonCounter = sonEntries.length;
    }

    // Consent Affidavit functionality for page 7
    function setupPage7Events() {
        console.log('Setting up page 7 events...');
        const appendButton = document.getElementById('append_consent_affidavit');
        const affidavitsContainer = document.getElementById('consent_affidavits_container');
        let affidavitCounter = 1;

        console.log('Append button found:', appendButton);
        console.log('Affidavits container found:', affidavitsContainer);

        if (appendButton && affidavitsContainer) {
            console.log('Adding click event listener to append button');
            appendButton.addEventListener('click', function() {
                console.log('Append button clicked!');
                const newAffidavit = document.createElement('div');
                newAffidavit.className = 'bg-[#334155] text-white p-6 rounded-lg border border-white mb-6';
                newAffidavit.innerHTML = `
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-bold">Consent Affidavit #${affidavitCounter}</h3>
                        <button type="button" class="remove-affidavit bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                    
                    <div class="bg-[#334155] text-white p-6 rounded-lg border border-white">
                        <div class="text-justify space-y-4">
                            <p><strong>1.</strong> That I know that the abovenamed <input type="text" placeholder="Enter Deceased Name" class="border bg-[#334155] text-white p-1 rounded w-48" /> deceased died at <input type="text" placeholder="Enter Place of Death" class="border bg-[#334155] text-white p-1 rounded w-48" /> on or about <input type="text" placeholder="Enter Day" class="border bg-[#334155] text-white p-1 rounded w-16" /> day of <input type="text" placeholder="Enter Month" class="border bg-[#334155] text-white p-1 rounded w-24" />, <input type="text" placeholder="Enter Year" class="border bg-[#334155] text-white p-1 rounded w-20" /> as intestate.</p>
                            
                            <p><strong>2.</strong> I say that I am aware that the Petitioner abovenamed is filing and/or has filed a Petition for Letters of Administration to the property and credits of the deceased abovenamed in his capacity as the <select class="border bg-[#334155] text-white p-1 rounded">
                                <option value="">Select Relation</option>
                                <option value="Widow">Widow</option>
                                <option value="Widower">Widower</option>
                                <option value="Son">Son</option>
                                <option value="Daughter">Daughter</option>
                                <option value="Mother">Mother</option>
                                <option value="Father">Father</option>
                                <option value="Brother">Brother</option>
                                <option value="Sister">Sister</option>
                            </select> of the deceased, in this Hon'ble Court.</p>
                            
                            <p><strong>3.</strong> I being the <select class="border bg-[#334155] text-white p-1 rounded">
                                <option value="">Select Relation</option>
                                <option value="Mother">Mother</option>
                                <option value="Father">Father</option>
                                <option value="Son">Son</option>
                                <option value="Daughter">Daughter</option>
                                <option value="Brother">Brother</option>
                                <option value="Sister">Sister</option>
                                <option value="Wife">Wife</option>
                                <option value="Husband">Husband</option>
                            </select> of the above named deceased do hereby give my full and free consent in favour of the above named Petitioner and pray that the Letters of Administration may be granted in her favour without service of any Citation/Notice upon me and without any surety being justified in the estate left by the deceased abovenamed.</p>
                        </div>
                        
                        <div class="mt-8 flex justify-between">
                            <div>
                                <p class="mb-4">Solemnly affirmed at <input type="text" placeholder="Enter Place" class="border bg-[#334155] text-white p-1 rounded" /></p>
                                <p>Dated this <input type="text" placeholder="Day" class="border bg-[#334155] text-white p-1 rounded w-16" /> day of <input type="text" placeholder="Month" class="border bg-[#334155] text-white p-1 rounded w-24" />, <input type="text" placeholder="Year" class="border bg-[#334155] text-white p-1 rounded w-20" /></p>
                            </div>
                            <div class="text-right">
                                <div class="w-48 h-16 border-2 border-dashed border-white flex items-center justify-center mb-2">
                                    <span class="text-sm">Signature</span>
                                </div>
                                <p class="text-sm">Consenting Party</p>
                            </div>
                        </div>
                    </div>
                `;
                
                affidavitsContainer.appendChild(newAffidavit);
                affidavitCounter++;
                
                // Add event listener to the remove button
                const removeBtn = newAffidavit.querySelector('.remove-affidavit');
                removeBtn.addEventListener('click', function() {
                    newAffidavit.remove();
                });
            });
        } else {
            console.log('Elements not found, will retry in 1 second...');
            // Retry after a short delay
            setTimeout(setupPage7Events, 1000);
        }
    }

function setupPage3Events() {
        const add_earlier = document.getElementById('add_earlier');
    const show_else_where_in_india = document.getElementById('show_it-when-elsewhereinindia');
    const deceased_property_place = document.getElementById('deceased_property_place');
        const save_and_except_testamentary_petition_para = document.getElementById('save-and-except-testamentary-petition-para');
    
    deceased_property_place.addEventListener('change',()=>{
        if(deceased_property_place.value === 'State of Maharashtra and elsewhere in India.') {
            show_else_where_in_india.classList.remove('hidden');
                // Change "State of Maharashtra" to "India" throughout page 3
                updateStateText('India');
        } else {
            show_else_where_in_india.classList.add('hidden');
                // Change back to "State of Maharashtra"
                updateStateText('State of Maharashtra');
            }
        })
        
        // Function to update "State of Maharashtra" text in page 3 paragraph only
        function updateStateText(newText) {
            const maharashtraSpan = document.getElementById('maharashtra-text');
            const indiaSpan = document.getElementById('india-text');
            
            if (maharashtraSpan && indiaSpan) {
                if (newText === 'India') {
                    maharashtraSpan.classList.add('hidden');
                    indiaSpan.classList.remove('hidden');
                } else {
                    maharashtraSpan.classList.remove('hidden');
                    indiaSpan.classList.add('hidden');
                }
            }
        }

        // Call the function initially
        updatePetitionerSignatureNames();


    add_earlier.addEventListener('change',()=>{
        if(add_earlier.value === 'Yes') {
            save_and_except_testamentary_petition_para.classList.remove('hidden');
        } else {
            save_and_except_testamentary_petition_para.classList.add('hidden');
        }
    })
    
    // Schedule II paragraph functionality
    const schedule_ii_para = document.getElementById('schedule_ii_para');
    const show_it_when_schedule_ii_para = document.getElementById('show_it-when-schedule-ii-para');
    
    console.log('Schedule II dropdown found:', !!schedule_ii_para);
    console.log('Show it when schedule II para found:', !!show_it_when_schedule_ii_para);
    
    if (schedule_ii_para) {
        schedule_ii_para.addEventListener('change', function() {
            if(this.value === 'Yes') {
            show_it_when_schedule_ii_para.classList.remove('hidden');
                
                // Check if already added
                if (document.querySelector('.schedule-ii-para')) {
                    return;
                }
                
                // Find the table in page3
                const table = document.querySelector('#page3 table tbody');
                if (!table) {
                    return;
                }
                
                // Find paragraph 6 (first row)
                const paragraph6Row = table.querySelector('tr:first-child');
                if (!paragraph6Row) {
                    return;
                }
                
                // Create new paragraph
                const newRow = document.createElement('tr');
                newRow.className = 'py-5 border-t border-white schedule-ii-para';
                
                newRow.innerHTML = `
                    <td class="text-center py-5 border-r border-white w-[10%]">
                        7.
                    </td>
                    <td colspan="3" class="py-5">
                        <p>
                            That the Petitioner has truly set forth in Schedule No. II, hereto annexed the marked Exhibit-"<select class="border p-1 mt-2 input border-white rounded exhibit-select" id="exhibit2">
                                <option value="">Select Exhibit</option>
                                <option value="A">A</option>
                                <option value="A-1">A-1</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                                <option value="G">G</option>
                                <option value="H">H</option>
                                <option value="I">I</option>
                                <option value="J">J</option>
                                <option value="custom">Unique</option>
                                </select>" all the items that by law they are allowed to deduct for the purpose of ascertaining the net estate of the deceased.
                        </p>
                    </td>
                `;
                
                // Insert after paragraph 6
                paragraph6Row.parentNode.insertBefore(newRow, paragraph6Row.nextSibling);
                
                // Renumber all paragraphs
                renumberAllParagraphs();
                
        } else {
            show_it_when_schedule_ii_para.classList.add('hidden');
                
                const scheduleIIRow = document.querySelector('.schedule-ii-para');
                if (scheduleIIRow) {
                    scheduleIIRow.remove();
                    renumberAllParagraphs();
        }
            }
        });
    }

    // Paragraph button functionality
    setupParagraphButtons();
    
    // Legal heir class wise paragraph buttons
    setupLegalHeirClassButtons();
}

// Global variable to track paragraph numbers
let currentParagraphNumber = 8; // Starting after paragraph 7

function setupParagraphButtons() {
    const addTenantedParaBtn = document.getElementById('add-tenanted-para');
    const addJointDeceasedParaBtn = document.getElementById('add-joint-deceased-para');
    const addTwoNameParaBtn = document.getElementById('add-two-name-para');
    const addAdditionalParaBtn = document.getElementById('add-additional-para');
    const addDelayParaBtn = document.getElementById('add-delay-para');

    if (addTenantedParaBtn) {
        addTenantedParaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addParagraph('tenanted');
        });
    }
    if (addJointDeceasedParaBtn) {
        addJointDeceasedParaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addParagraph('joint-deceased');
        });
    }
    if (addTwoNameParaBtn) {
        addTwoNameParaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addParagraph('two-name');
        });
    }
    if (addAdditionalParaBtn) {
        addAdditionalParaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addParagraph('additional');
        });
    }
    if (addDelayParaBtn) {
        addDelayParaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addParagraph('delay');
        });
    }

    // Tag the original paragraph 8 row so we can always insert before it
    const table = document.querySelector('#page3 table tbody');
    if (table && !table.querySelector('tr[data-original-para8="true"]')) {
        const rows = Array.from(table.querySelectorAll('tr'));
        const original8 = rows.find(r => {
            const firstCell = r.querySelector('td:first-child');
            return firstCell && firstCell.textContent.trim() === '8.';
        });
        if (original8) {
            original8.dataset.originalPara8 = 'true';
        }
    }
}

function setupLegalHeirClassButtons() {
    const buttons = [
        { id: 'about-deceased-btn', modal: 'about-deceased-modal' },
        { id: 'about-parents-btn', modal: 'about-parents-modal' },
        { id: 'about-spouse-children-btn', modal: 'about-spouse-children-modal' },
        { id: 'about-sons-daughters-btn', modal: 'about-sons-daughters-modal' },
        { id: 'about-husbands-heirs-btn', modal: 'about-husbands-heirs-modal' },
        { id: 'brother-sister-btn', modal: 'brother-sister-modal' },
        { id: 'legal-heirs-dont-cover-btn', modal: 'legal-heirs-dont-cover-modal' },
        { id: 'no-legal-heir-btn', modal: 'no-legal-heir-modal' },
        { id: 'minor-children-btn', modal: 'minor-children-modal' },
        { id: 'no-dc-btn', modal: 'no-dc-modal' },
        { id: 'divorce-btn', modal: 'divorce-modal' }
    ];

    buttons.forEach(button => {
        const btnElement = document.getElementById(button.id);
        if (btnElement) {
            btnElement.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(button.modal);
            });
        }
    });

    // Set up close modal buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.getAttribute('data-modal');
            closeModal(modalId);
        });
    });

    // Search Para button
    const searchParaBtn = document.getElementById('search-para-btn');
    if (searchParaBtn) {
        searchParaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('search-para-modal');
            buildSearchParaList();
            const input = document.getElementById('search-para-input');
            if (input) {
                input.value = '';
                input.focus();
            }
        });
    }

    // Add New Para button
    const newParaBtn = document.getElementById('new-para');
    if (newParaBtn) {
        newParaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('add-new-para-modal');
        });
    }

    // Set up modal option buttons
    const modalOptions = document.querySelectorAll('.modal-option');
    modalOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const optionText = option.textContent;
            const optionValue = option.getAttribute('data-option');
            addToTextarea(optionText);
            closeModal(option.closest('[id$="-modal"]').id);
        });
    });

    // Close modal when clicking outside
    const modals = document.querySelectorAll('[id$="-modal"]');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Submit button for Add New Para modal
    const submitNewParaBtn = document.getElementById('submit-new-para');
    if (submitNewParaBtn) {
        submitNewParaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const titleInput = document.getElementById('new-para-title');
            const contentInput = document.getElementById('new-para-content');
            
            if (titleInput && contentInput) {
                const title = titleInput.value.trim();
                const content = contentInput.value.trim();
                
                if (title && content) {
                    // Create a new button for the custom paragraph
                    const newButton = document.createElement('button');
                    newButton.type = 'button';
                    newButton.className = 'bg-blue-600 hover:bg-blue-700 text-white p-3 rounded text-sm font-medium transition-colors custom-para-btn';
                    newButton.textContent = title;
                    newButton.dataset.paraContent = content;
                    
                    // Add click event to insert the paragraph content
                    newButton.addEventListener('click', function() {
                        const legalHeirClassTextarea = document.getElementById('legal-heir-class-textarea');
                        if (legalHeirClassTextarea) {
                            // Insert the custom paragraph content
                            if (legalHeirClassTextarea.value.trim()) {
                                legalHeirClassTextarea.value += '\n\n' + content;
                            } else {
                                legalHeirClassTextarea.value = content;
                            }
                            console.log('Custom paragraph added:', title);
                        }
                    });
                    
                    // Insert the new button into the grid
                    const buttonGrid = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-3.lg\\:grid-cols-4');
                    if (buttonGrid) {
                        buttonGrid.appendChild(newButton);
                    }
                    
                    // Close modal and reset form
                    closeModal('add-new-para-modal');
                    titleInput.value = '';
                    contentInput.value = '';
                    
                    console.log('New paragraph button created:', title);
                } else {
                    alert('Please fill in both title and content fields.');
                }
            }
        });
    }
}

// Build aggregated list of all modal options for Search Para modal
function buildSearchParaList() {
    const container = document.getElementById('search-para-list');
    if (!container) return;

    // Collect all options from existing modals
    const allOptions = Array.from(document.querySelectorAll('.modal-option')).map((el) => ({
        element: el,
        text: el.textContent.trim(),
        option: el.getAttribute('data-option') || '',
        modalId: el.closest('[id$="-modal"]').id
    }));

    // Clear and render list
    container.innerHTML = '';
    allOptions.forEach(({ text, option, modalId }) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'w-full text-left p-3 border border-gray-300 rounded hover:bg-gray-100 text-black';
        btn.textContent = text;
        btn.dataset.option = option;
        btn.dataset.sourceModal = modalId;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            addToTextarea(text);
            closeModal('search-para-modal');
        });
        container.appendChild(btn);
    });

    // Hook up live search
    const input = document.getElementById('search-para-input');
    if (input) {
        input.oninput = function() {
            const q = input.value.trim().toLowerCase();
            const items = Array.from(container.children);
            // Score items: higher score for startsWith, then includes
            const scored = items.map((node) => {
                const label = node.textContent.toLowerCase();
                let score = 0;
                if (!q) score = 0;
                else if (label.startsWith(q)) score = 2;
                else if (label.includes(q)) score = 1;
                return { node, score };
            });
            scored.sort((a, b) => b.score - a.score);
            // Re-append in new order, hiding non-matches
            container.innerHTML = '';
            scored.forEach(({ node, score }) => {
                node.classList.toggle('hidden', !!q && score === 0);
                container.appendChild(node);
            });
        };
    }
}

function addParagraph(type) {
    const table = document.querySelector('#page3 table tbody');
    if (!table) return;

    // Get paragraph content based on type (with underscores instead of input fields)
    const paragraphContent = getParagraphContentWithUnderscores(type);

    // Create a new row for the paragraph
    const newRow = document.createElement('tr');
    newRow.className = 'py-5 border-t border-white';
    newRow.dataset.paragraphType = type;
    newRow.dataset.paragraphNumber = 8;

    newRow.innerHTML = `
        <td class="text-center py-5 border-r border-white w-[10%]">
            8.
        </td>
        <td colspan="3" class="py-5">
            <textarea class="border p-1 mt-2 input border-white rounded w-full" rows="4">${paragraphContent}</textarea>
            <div class="text-right mt-3">
                <button type="button" class="remove-para-btn bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700" data-paragraph-number="8">
                    Remove Paragraph
            </button>
            </div>
        </td>
    `;

    // Always insert just before the row tagged as original paragraph 8
    const originalPara8Row = table.querySelector('tr[data-original-para8="true"]');
    if (originalPara8Row) {
        table.insertBefore(newRow, originalPara8Row);
    } else {
        // Fallback: append at end
        table.appendChild(newRow);
    }
    
    // Set up event listeners for the new paragraph
    setupParagraphEvents(newRow, type, 8);
    
    // Renumber all paragraphs after adding the new one
    renumberParagraphs();
    
    // Update paragraph count in declaration
    updateParagraphCount();
    
    console.log(`Added ${type} paragraph with number 8`);
}

function setupParagraphEvents(row, type, paragraphNumber) {
    // Set up remove button functionality for all paragraph types
    const removeBtn = row.querySelector('.remove-para-btn');
    if (removeBtn) {
        removeBtn.addEventListener('click', function() {
            removeParagraph(row, paragraphNumber);
        });
    }
    
    // For textarea-based paragraphs, we don't need complex event setup
    // since they use underscores and are readonly
    console.log(`Set up events for ${type} paragraph with number ${paragraphNumber}`);
}

function removeParagraph(row, paragraphNumber) {
    // Confirm before removing
    if (confirm(`Are you sure you want to remove paragraph ${paragraphNumber}?`)) {
        console.log(`Removing paragraph ${paragraphNumber}`);
        
        // Remove the row from the table
        row.remove();
        
        // Renumber all paragraphs after removal
        renumberParagraphs();
        
        // Update paragraph count in declaration
        updateParagraphCount();
        
        console.log(`Paragraph ${paragraphNumber} removed successfully`);
    }
}

function removeParagraphFrom8(paragraphElement) {
    // Confirm before removing
    if (confirm('Are you sure you want to remove this paragraph?')) {
        console.log('Removing paragraph from paragraph 8');
        
        // Remove the paragraph element
        paragraphElement.remove();
        
        console.log('Paragraph removed successfully from paragraph 8');
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        console.log(`Opened modal: ${modalId}`);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        console.log(`Closed modal: ${modalId}`);
    }
}

function addToTextarea(text) {
    const textarea = document.getElementById('legal-heir-class-textarea');
    if (textarea) {
        const currentText = textarea.value;
        const newText = currentText ? currentText + ' ' + text : text;
        textarea.value = newText;
        console.log(`Added text to textarea: ${text}`);
    }
}

function renumberParagraphs() {
    const table = document.querySelector('#page3 table tbody');
    if (!table) return;
    
    const allRows = table.querySelectorAll('tr');
    let dynamicParagraphNumber = 7; // Start numbering dynamic paragraphs from 8 (after paragraph 7)
    
    allRows.forEach(row => {
        const firstCell = row.querySelector('td:first-child');
        if (firstCell && row.dataset.paragraphType) {
            // Only renumber dynamically added paragraphs (those with paragraphType data attribute)
            dynamicParagraphNumber++;
            firstCell.textContent = `${dynamicParagraphNumber}.`;
            
            // Update data attributes for dynamic paragraphs
            row.dataset.paragraphNumber = dynamicParagraphNumber;
            
            // Update remove button data attribute
            const removeBtn = row.querySelector('.remove-para-btn');
            if (removeBtn) {
                removeBtn.dataset.paragraphNumber = dynamicParagraphNumber;
            }
        }
        // Original paragraphs (6, 7) are left unchanged, but paragraph 8 and beyond need to be renumbered
        else if (firstCell && !row.dataset.paragraphType) {
            const cellText = firstCell.textContent.trim();
            const match = cellText.match(/^(\d+)\.$/);
            if (match) {
                const paraNumber = parseInt(match[1]);
                // If this is paragraph 8 or beyond, renumber it
                if (paraNumber >= 8) {
                    dynamicParagraphNumber++;
                    firstCell.textContent = `${dynamicParagraphNumber}.`;
                }
            }
        }
    });
    
    // Update the global counter
    currentParagraphNumber = dynamicParagraphNumber;
}

function getParagraphContentWithUnderscores(type) {
    switch(type) {
        case 'tenanted':
            return `That the deceased was the tenant in respect of Chawl No. ___ Room No. ___, Group No. ___, Mumbai – ___, and monthly rent was of Rs.___/-, hereto annexed and marked as Exhibit-"___" is a copy of rent receipt issued by the MHADA.`;
        
        case 'joint-deceased':
            return `That the Petitioner has filed the above Petition in the names of two deceased individuals, who were husband and wife. The Petitioner is the daughter of both the deceased. Certain properties mentioned in Schedule No. I are standing in the names of both the deceased; therefore, the Petitioner has filed the above Petition in their names.`;
        
        case 'two-name':
            return `I state that in the title of the petition, the name of the deceased is mentioned as ___. During his lifetime, the deceased changed his name from ___ as recorded in the Government Official Gazette dated ___. A copy of the said Government Official Gazette is annexed hereto and marked as Exhibit ___. I further state that all the names mentioned above refer to one and the same person, i.e., the deceased.`;
        
        case 'additional':
            return `___`;
        
        case 'delay':
            return `That the delay in making the present Petition is on account of the facts that Petitioner is ignorant and unaware of obtaining any legal representation. Now the Petitioner/s has/have been recently advised to obtain a legal representation. Hence this Hon'ble Court in the interest of justice may condone the delay.`;
        
        default:
            return `That the Petitioner hereby declares that all the statements made herein are true to the best of his/her knowledge, information and belief.`;
    }
}

function getParagraphContent(type) {
    switch(type) {
        case 'tenanted':
            return `That the deceased was the tenant in respect of Chawl No. <input type="text" placeholder="Chawl No." class="border p-1 mt-2 input border-white rounded w-20"> Room No. <input type="text" placeholder="Room No." class="border p-1 mt-2 input border-white rounded w-20">, Group No. <input type="text" placeholder="Group No." class="border p-1 mt-2 input border-white rounded w-20">, Mumbai – <input type="text" placeholder="Enter address of property" class="border p-1 mt-2 input border-white rounded w-60">, and monthly rent was of Rs.<input type="text" placeholder="Amount" class="border p-1 mt-2 input border-white rounded w-24">/-, hereto annexed and marked as Exhibit-"<select class="border p-1 mt-2 input border-white rounded exhibit-select">
                <option value="">Select Exhibit</option>
                <option value="A">A</option>
                <option value="A-1">A-1</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
                <option value="H">H</option>
                <option value="I">I</option>
                <option value="J">J</option>
                <option value="custom">Unique</option>
            </select><input type="text" placeholder="Custom Exhibit" class="border p-1 mt-2 input border-white rounded w-16 hidden custom-exhibit-input">" is a copy of rent receipt issued by the MHADA 
            <div class="mt-3">
                <label class="text-white font-semibold">Receipt Available:</label>
                <label class="text-white ml-3">
                    <input type="radio" name="receipt_available_${currentParagraphNumber}" value="yes" class="mr-1 receipt-radio"> Yes
                </label>
                <label class="text-white ml-3">
                    <input type="radio" name="receipt_available_${currentParagraphNumber}" value="no" class="mr-1 receipt-radio"> No
                </label>
            </div>
            <div class="receipt-yes hidden mt-3" id="receipt_yes_${currentParagraphNumber}">
                The said rent receipt is the last rent receipt available which is issued by <input type="text" placeholder="Enter issuer name" class="border p-1 mt-2 input border-white rounded w-40"> and thereafter <input type="text" placeholder="Enter who stopped" class="border p-1 mt-2 input border-white rounded w-40"> stopped accepting and issuing rent receipt.
            </div>
            <div class="receipt-no hidden mt-3" id="receipt_no_${currentParagraphNumber}">
                <input type="text" placeholder="Enter issuer name" class="border p-1 mt-2 input border-white rounded w-40"> and thereafter <input type="text" placeholder="Enter who stopped" class="border p-1 mt-2 input border-white rounded w-40"> stopped accepting and issuing rent receipt.
            </div>`;
        
        case 'joint-deceased':
            return `That the Petitioner has filed the above Petition in the names of two deceased individuals, who were husband and wife. The Petitioner is the daughter of both the deceased. Certain properties mentioned in Schedule No. I are standing in the names of both the deceased; therefore, the Petitioner has filed the above Petition in their names.`;
        
        case 'two-name':
            return `I state that in the title of the petition, the name of the deceased is mentioned as <input type="text" placeholder="Enter current name" class="border p-1 mt-2 input border-white rounded w-40">. During his lifetime, the deceased changed his name from <input type="text" placeholder="Enter previous name" class="border p-1 mt-2 input border-white rounded w-40">  as recorded in the Government Official Gazette dated <input type="date" placeholder="Enter date" class="border p-1 mt-2 input border-white rounded w-40">. A copy of the said Government Official Gazette is annexed hereto and marked as Exhibit <select class="border p-1 mt-2 input border-white rounded exhibit-select">
                <option value="">Select Exhibit</option>
                <option value="A">A</option>
                <option value="A-1">A-1</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
                <option value="H">H</option>
                <option value="I">I</option>
                <option value="J">J</option>
                <option value="custom">Unique</option>
            </select><input type="text" placeholder="Custom Exhibit" class="border p-1 mt-2 input border-white rounded w-16 hidden custom-exhibit-input"> I further state that all the names mentioned above refer to one and the same person, i.e., the deceased`;
        
        case 'additional':
            return `<textarea class="border p-1 mt-2 input border-white rounded w-full" placeholder="Enter additional information" rows="5"></textarea>`;
        
        case 'delay':
            return `That the delay in making the present Petition is on account of the facts that Petitioner is ignorant and unaware of obtaining any legal representation. Now the Petitioner/s has/have been recently advised to obtain a legal representation. Hence this Hon'ble Court in the interest of justice may condone the delay. `;
        
        default:
            return `That the Petitioner hereby declares that all the statements made herein are true to the best of his/her knowledge, information and belief.`;
    }
}

// Schedule II paragraph functionality
let scheduleIIParagraphAdded = false;

function addScheduleIIParagraph() {
    if (scheduleIIParagraphAdded) return; // Prevent duplicate addition
    
    const table = document.querySelector('table tbody');
    if (!table) return;
    
    // Find paragraph 6 (the one containing the Schedule II dropdown)
    const rows = table.querySelectorAll('tr');
    let paragraph6Row = null;
    
    // Find the row that contains the Schedule II dropdown
    for (let row of rows) {
        const scheduleDropdown = row.querySelector('#schedule_ii_para');
        if (scheduleDropdown) {
            paragraph6Row = row;
            break;
        }
    }
    
    if (!paragraph6Row) {
        console.log('Schedule II dropdown not found');
        return;
    }
    
    // Create new paragraph row for Schedule II
    const newRow = document.createElement('tr');
    newRow.className = 'py-5 border-t border-white schedule-ii-para';
    newRow.dataset.paragraphType = 'schedule-ii';
    
    newRow.innerHTML = `
        <td class="text-center py-5 border-r border-white w-[10%]">
            7.
        </td>
        <td colspan="3" class="py-5">
            <p>
                That the Petitioner has truly set forth in Schedule No. II, hereto annexed the marked Exhibit-"<input type="text" placeholder="   " class="border p-1 mt-2 input border-white rounded w-20">" all the items that by law they are allowed to deduct for the purpose of ascertaining the net estate of the deceased.
            </p>
        </td>
    `;
    
    // Insert after paragraph 6
    paragraph6Row.parentNode.insertBefore(newRow, paragraph6Row.nextSibling);
    
    // Renumber subsequent paragraphs
    renumberParagraphsAfterScheduleII();
    
    scheduleIIParagraphAdded = true;
    console.log('Schedule II paragraph added successfully');
}

function removeScheduleIIParagraph() {
    if (!scheduleIIParagraphAdded) return;
    
    const scheduleIIRow = document.querySelector('.schedule-ii-para');
    if (scheduleIIRow) {
        scheduleIIRow.remove();
        renumberParagraphsAfterScheduleII();
        scheduleIIParagraphAdded = false;
        console.log('Schedule II paragraph removed successfully');
    } else {
        console.log('Schedule II paragraph row not found for removal');
    }
}

function renumberParagraphsAfterScheduleII() {
    const table = document.querySelector('table tbody');
    if (!table) return;
    
    const rows = table.querySelectorAll('tr');
    let currentNumber = 6; // Start from paragraph 6
    
    rows.forEach((row, index) => {
        const firstCell = row.querySelector('td:first-child');
        if (firstCell) {
            // Check if this is the original paragraph 6 (contains Schedule II dropdown)
            const hasScheduleDropdown = row.querySelector('#schedule_ii_para');
            if (hasScheduleDropdown) {
                // This is paragraph 6, keep it as 6
                firstCell.textContent = '6.';
            } else {
                // This is a subsequent paragraph, increment the number
                currentNumber++;
                firstCell.textContent = `${currentNumber}.`;
            }
        }
    });
    
    console.log('Paragraphs renumbered successfully');
}

// Test function for Schedule II paragraph (temporary for debugging)
function testScheduleII() {
    console.log('Testing Schedule II functionality...');
    console.log('addScheduleIIParagraph function exists:', typeof addScheduleIIParagraph);
    console.log('removeScheduleIIParagraph function exists:', typeof removeScheduleIIParagraph);
    console.log('scheduleIIParagraphAdded:', scheduleIIParagraphAdded);
    
    // Test adding the paragraph
    addScheduleIIParagraph();
}

// Make functions globally accessible for testing
window.testScheduleII = testScheduleII;
window.addScheduleIIParagraph = addScheduleIIParagraph;
window.removeScheduleIIParagraph = removeScheduleIIParagraph;

// Simple function to renumber all paragraphs
function renumberAllParagraphs() {
    const table = document.querySelector('#page3 table tbody');
    if (!table) {
        return;
    }
    
    const rows = table.querySelectorAll('tr');
    let currentNumber = 6; // Start from paragraph 6
    
    rows.forEach((row) => {
        const firstCell = row.querySelector('td:first-child');
        if (firstCell) {
            // Check if this is the original paragraph 6 (contains Schedule II dropdown)
            const hasScheduleDropdown = row.querySelector('#schedule_ii_para');
            if (hasScheduleDropdown) {
                // This is paragraph 6, keep it as 6
                firstCell.textContent = '6.';
            } else {
                // This is a subsequent paragraph, increment the number
                currentNumber++;
                firstCell.textContent = `${currentNumber}.`;
            }
        }
    });
    
    // Update paragraph count in declaration after renumbering
    updateParagraphCount();
}

// Function to update Petitioner text based on count
function updatePetitionerText() {
    const petitionerBlocks = document.querySelectorAll('.petitioner_block');
    const petitionerCount = petitionerBlocks.length;
    
    // Get the correct form based on count (without possessive 's)
    const petitionerText = petitionerCount === 1 ? 'Petitioner' : 'Petitioners';
    
    // Update all instances of "Petitioner" in the document
    const allTextNodes = document.evaluate(
        "//text()[contains(., 'Petitioner')]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    
    for (let i = 0; i < allTextNodes.snapshotLength; i++) {
        const textNode = allTextNodes.snapshotItem(i);
        let text = textNode.textContent;
        
        // Replace "Petitioner" with the correct form (without 's)
        text = text.replace(/Petitioners?/g, petitionerText);
        
        textNode.textContent = text;
    }
    
    // Also update specific elements that might contain petitioner text
    const petitionerElements = document.querySelectorAll('[data-petitioner-text]');
    petitionerElements.forEach(element => {
        element.textContent = petitionerText;
    });
    
    console.log(`Updated petitioner text: ${petitionerCount} petitioner(s) - using "${petitionerText}"`);
}

// Function to handle separate Add Sub Legal Heirs button
function setupSeparateSubHeirsButton() {
    const separateButton = document.getElementById('add-sub-legal-heirs-separate');
    if (separateButton) {
        separateButton.addEventListener('click', function() {
            console.log('Separate Add Sub Legal Heirs button clicked');
            // Add your sub legal heirs functionality here
            // This can open a modal or add sub heirs to the petitioner
            alert('Add Sub Legal Heirs functionality - to be implemented');
        });
    }
}




