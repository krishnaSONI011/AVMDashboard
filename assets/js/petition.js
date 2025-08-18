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
        // ✅ Now that content is loaded, run your setup logic
        setupPage1Events();
        setupPage2Events();
        
        // Initialize legal heirs table after page content is loaded
        setTimeout(() => {
            if (typeof initializeLegalHeirsTable === 'function') {
                console.log('Calling initializeLegalHeirsTable from timeout');
                initializeLegalHeirsTableWithRetry();
            } else {
                console.log('initializeLegalHeirsTable function not found');
            }
        }, 500);
    }

    function initializeLegalHeirsTableWithRetry() {
        // Check if petitioner blocks are available
        const petitionerBlocks = document.querySelectorAll('.petitioner_block');
        console.log('Petitioner blocks found:', petitionerBlocks.length);
        
        if (petitionerBlocks.length > 0) {
            initializeLegalHeirsTable();
        } else {
            console.log('No petitioner blocks found, retrying in 1 second...');
            setTimeout(() => {
                initializeLegalHeirsTableWithRetry();
            }, 1000);
        }
    }

    

    getThePage();

    // Global event listener as backup for consent affidavit button
  

    function setupPage1Events() {
       
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

                const removeBtn = document.createElement("button");
                removeBtn.className = "remove_petitioner_btn bg-gray-500 text-white px-3 py-1 rounded mt-3 ml-2";
                removeBtn.textContent = "Remove Petitioner";
                removeBtn.onclick = () => {
                    newBlock.remove();
                    updatePetitionerNumbers();
                };

                newBlock.appendChild(removeBtn);
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
                button.addEventListener("click", function(e) {
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
            }
            
            // Initial setup
            setupPetitionerInputListeners();
            updatePetitionerDisplay();
            
            // Set up observer to watch for new petitioner blocks
            const petitionerWrapper = document.getElementById('petitioner_wrapper');
            if (petitionerWrapper) {
                const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.type === 'childList') {
                            setupPetitionerInputListeners();
                            updatePetitionerDisplay();
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
            // Handle main exhibit selects
            const exhibitSelects = document.querySelectorAll('.exhibit-select');
            exhibitSelects.forEach(select => {
                select.addEventListener('change', function() {
                    const customInput = this.nextElementSibling;
                    if (this.value === 'custom') {
                        this.classList.add('hidden');
                        if (customInput && customInput.classList.contains('custom-exhibit-input')) {
                            customInput.classList.remove('hidden');
                            customInput.focus();
                        }
                    } else {
                        if (customInput && customInput.classList.contains('custom-exhibit-input')) {
                            customInput.classList.add('hidden');
                            customInput.value = '';
                        }
                    }
                });
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

            // Handle son exhibit selects
            const sonExhibitSelects = document.querySelectorAll('.son-exhibit-select');
            sonExhibitSelects.forEach(select => {
                select.addEventListener('change', function() {
                    const customInput = this.nextElementSibling;
                    if (this.value === 'custom') {
                        this.classList.add('hidden');
                        if (customInput && customInput.classList.contains('son-custom-exhibit-input')) {
                            customInput.classList.remove('hidden');
                            customInput.focus();
                        }
                    } else {
                        if (customInput && customInput.classList.contains('son-custom-exhibit-input')) {
                            customInput.classList.add('hidden');
                            customInput.value = '';
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
                        removeBtn = document.createElement("button");
                        removeBtn.className = "remove_petitioner_btn bg-gray-500 text-white px-3 py-1 rounded mt-3 ml-2";
                        removeBtn.textContent = "Remove Petitioner";
                        removeBtn.onclick = () => {
                            block.remove();
                            updatePetitionerNumbers();
                        };
                        block.appendChild(removeBtn);
                    } else if (removeBtn && index === 0) {
                        removeBtn.remove();
                    }
                });

            // Update "being" text based on number of petitioners
            updateBeingText(blocks.length);
            
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





        // copy text  dc address
        const dc_address_copy_button = document.getElementById("dc_address_button")
        const enter_addressProof_text = document.getElementById("enter_addressProof")
        const toast = document.getElementById("toast")
        
        if (dc_address_copy_button && enter_addressProof_text && toast) {
            dc_address_copy_button.addEventListener("click",(e)=>{
                e.preventDefault()
                
                const dc_address = enter_addressProof_text.value
                navigator.clipboard.writeText(dc_address).then(()=>{
                
                toast.innerText = "DC ADDRESS COPY !"
                toast.classList.remove("hidden")

                setTimeout(()=>{
                    toast.classList.add("hidden")
                    toast.innerText = ""
                },2000)
                })
            })
        }

        // copy address proof

        const address_proof_copy_button = document.getElementById("address_proof_button")
        const address_proof_input = document.getElementById("address_proof")
        if (address_proof_copy_button && address_proof_input && toast) {
            address_proof_copy_button.addEventListener("click",(e)=>{
                e.preventDefault()
                const dc_address = address_proof_input.value
                navigator.clipboard.writeText(dc_address).then(()=>{
                
                toast.innerText = "Address Proof Copy"
                toast.classList.remove("hidden")

                setTimeout(()=>{
                    toast.classList.add("hidden")
                    toast.innerText = ""
                },2000)
                })
            })
        }
    

    // Legal Heir functionality for page 2 - Global variables
    let legalHeirCounter = 0; // Will be set based on number of petitioners
    let subHeirCounter = 0; // Counter for sub-heirs
    
    console.log('Global variables initialized - legalHeirCounter:', legalHeirCounter, 'subHeirCounter:', subHeirCounter);

    function setupPage2Events() {
        // Don't initialize legal heirs table here - it will be called after a delay
        // to ensure all content is loaded
        
        const the_proof_selector = document.getElementById('proof_select')
        if (the_proof_selector) {
            the_proof_selector.addEventListener("change",(e)=>{
                if(e.target.value === "7") document.getElementById("no_proof").classList.remove("hidden")
                else document.getElementById("no_proof").classList.add("hidden")
            })
        }

        // Setup buttons with retry mechanism
        setupLegalHeirButtons();
        
        // Setup remove buttons for existing sons
        setupSonRemoveButtons();
    }

    function setupLegalHeirButtons() {
        const addMoreLegalHeirBtn = document.getElementById('add-more-legal-heir');
        const addSubLegalHeirBtn = document.getElementById('add-sub-legal-heir');
        const addSonBtn = document.getElementById('add-son-btn');
        
        console.log('Setting up legal heir buttons...');
        console.log('Add More Legal Heir button found:', !!addMoreLegalHeirBtn);
        console.log('Add Sub Legal Heir button found:', !!addSubLegalHeirBtn);
        console.log('Add Son button found:', !!addSonBtn);

        if (addMoreLegalHeirBtn) {
            addMoreLegalHeirBtn.addEventListener('click', addMoreLegalHeir);
        }

        if (addSubLegalHeirBtn) {
            addSubLegalHeirBtn.addEventListener('click', addSubLegalHeir);
        }

        if (addSonBtn) {
            addSonBtn.addEventListener('click', addSon);
        }
        
        // If buttons are not found, retry after a delay
        if (!addMoreLegalHeirBtn || !addSubLegalHeirBtn || !addSonBtn) {
            console.log('Some buttons not found, retrying in 1 second...');
            setTimeout(setupLegalHeirButtons, 1000);
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
            
            // Get petitioner information from the block
            const nameInput = petitionerBlock.querySelector('input[placeholder="Enter Petitioner Name"]');
            const addressInput = petitionerBlock.querySelector('textarea[placeholder="Enter Petitioner Address"]');
            
            const petitionerName = nameInput ? nameInput.value : '';
            const petitionerAddress = addressInput ? addressInput.value : '';
            console.log('Petitioner', i + 1, 'Name:', petitionerName, 'Address:', petitionerAddress);
            console.log('Name input found:', !!nameInput, 'Address input found:', !!addressInput);
            
            // Determine reference text based on petitioner number
            let referenceText = '(The Petitioner herein)';
            if (petitionerCount > 1) {
                referenceText = `(The Petitioner No.${i + 1} herein)`;
            }
            if (petitionerBlocks.length === 1) {
                newRow.innerHTML = `
                <td class="border border-white p-2 text-center">${i + 1}</td>
                <td class="border border-white p-2">
                    <div class="space-y-2">
                        <input type="text" value="${petitionerName}" placeholder="NAME OF PETITIONER" class="w-full input border p-1 border-white rounded petitioner-name-display">
                        <input type="text" placeholder="Residing at" class="w-full input border p-1 border-white rounded">
                        <input type="text" value="${petitionerAddress}" placeholder="ADDRESS OF PETITIONER AS PER TITLE OF PETITIONER" class="w-full input border p-1 border-white rounded petitioner-address-display">
                        <span class="petitioner-reference-text text-white">${referenceText}</span>
                    </div>
                </td>
                <td class="border border-white p-2">
                    <span class="text-white">-</span>
                </td>
                                <td class="border border-white p-2">
                    
                </td>
                <td class="border border-white p-2 text-center">
                    <!-- No action needed for petitioner -->
                </td>
            `;
            } if(petitionerBlocks.length > 1) {
                newRow.innerHTML = `
                <td class="border border-white p-2 text-center">${i + 1}</td>
                <td class="border border-white p-2">
                    <span class="petitioner-reference-text text-white">${referenceText}</span>
                    </div>
                </td>
                <td class="border border-white p-2">
                    <span class="text-white">-</span>
                </td>
                                <td class="border border-white p-2">
                    
                </td>
                <td class="border border-white p-2 text-center">
                    <!-- No action needed for petitioner -->
                </td>
            `;
            }
           
            
            tbody.appendChild(newRow);
        }
        
        // Update row numbers
        updateRowNumbers();
        console.log('Legal heirs table initialization complete');
        
        // Set up real-time sync for petitioner data
        setupPetitionerDataSync();
    }

    function setupPetitionerDataSync() {
        // Set up event listeners for petitioner inputs to sync with legal heirs table
        const petitionerBlocks = document.querySelectorAll('.petitioner_block');
        
        petitionerBlocks.forEach((block, index) => {
            const nameInput = block.querySelector('input[placeholder="Enter Petitioner Name"]');
            const addressInput = block.querySelector('textarea[placeholder="Enter Petitioner Address"]');
            
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
                    <div class="flex items-center gap-4 mt-2">
                        <label class="text-white text-sm">Alive or Died:</label>
                        <label class="text-white text-sm">
                            <input type="radio" name="alive_died_${legalHeirCounter}" value="alive" class="mr-1 alive-died-radio"> Alive
                        </label>
                        <label class="text-white text-sm">
                            <input type="radio" name="alive_died_${legalHeirCounter}" value="died" class="mr-1 alive-died-radio"> Died
                        </label>
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
                        <div class="mt-2">
                            <label class="text-white text-sm">Died on:</label>
                            <input type="date" class="border p-1 border-white rounded ml-2 died-date">
                        </div>
                        <button type="button" class="add-sub-heirs-btn bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600 mt-2" data-heir-id="${legalHeirCounter}">
                            + Add Sub Legal Heirs
                        </button>
                    </div>
                </div>
            </td>
            <td class="border border-white p-2">
                <input type="number" placeholder="Age of Legal Heir" class="w-full border p-1 border-white input rounded">
            </td>
            <td class="border border-white p-2">
                <input type="text" placeholder="Relation with deceased" class="w-full border p-1 border-white input rounded">
            </td>
            <td class="border border-white p-2 text-center">
                <button type="button" class="remove-row-btn bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Remove</button>
            </td>
        `;
        
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
                if (this.value === 'died') {
                    diedDetails.classList.remove('hidden');
                } else {
                    diedDetails.classList.add('hidden');
                }
            });
        });

        // Add event listener for sub-heirs button
        const addSubHeirsBtn = row.querySelector('.add-sub-heirs-btn');
        if (addSubHeirsBtn) {
            addSubHeirsBtn.addEventListener('click', function() {
                const heirId = this.dataset.heirId;
                addSubLegalHeirsForHeir(heirId);
            });
        }
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
                <input type="text" placeholder="Relation with deceased" class="w-full border p-1 border-white input rounded">
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

    function addSubLegalHeirsForHeir(heirId) {
        console.log('Adding sub legal heirs for heir ID:', heirId);
        const tbody = document.querySelector('#legal-heirs-table tbody');
        if (!tbody) return;
        
        // Get the legal heir name for reference
        const heirRow = document.querySelector(`tr[data-heir-id="${heirId}"]`);
        const heirNameInput = heirRow.querySelector('.legal-heir-name');
        const heirName = heirNameInput ? heirNameInput.value : `Heir ${heirId}`;
        
        // Create sub-heir row
        const newRow = document.createElement('tr');
        newRow.className = 'sub-heir-row';
        newRow.dataset.parentHeirId = heirId;
        
        // Generate sub-heir number (2A, 2B, etc.)
        const existingSubHeirs = tbody.querySelectorAll(`tr[data-parent-heir-id="${heirId}"]`);
        const subHeirLetter = String.fromCharCode(97 + existingSubHeirs.length); // a, b, c, etc.
        const subHeirNumber = `${heirId}${subHeirLetter.toUpperCase()}`;
        
        newRow.innerHTML = `
            <td class="border border-white p-2 text-center">${subHeirNumber}</td>
            <td class="border border-white p-2">
                <div class="space-y-2">
                    <input type="text" placeholder="SUB LEGAL HEIR FULL NAME" class="w-full input border p-1 border-white rounded sub-heir-name">
                    <div class="flex items-center gap-4 mt-2">
                        <label class="text-white text-sm">Alive or Died:</label>
                        <label class="text-white text-sm">
                            <input type="radio" name="sub_alive_died_${heirId}_${subHeirLetter}" value="alive" class="mr-1 sub-alive-died-radio"> Alive
                        </label>
                        <label class="text-white text-sm">
                            <input type="radio" name="sub_alive_died_${heirId}_${subHeirLetter}" value="died" class="mr-1 sub-alive-died-radio"> Died
                        </label>
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
                        <div class="mt-2">
                            <label class="text-white text-sm">Died on:</label>
                            <input type="date" class="border p-1 border-white rounded ml-2 sub-died-date">
                        </div>
                        <button type="button" class="add-sub-sub-heirs-btn bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600 mt-2" data-parent-heir-id="${heirId}" data-sub-heir-id="${subHeirLetter}">
                            + Add Sub-Sub Legal Heirs
                        </button>
                    </div>
                </div>
            </td>
            <td class="border border-white p-2">
                <input type="number" placeholder="Age of Sub Legal Heir" class="w-full border p-1 border-white input rounded">
            </td>
            <td class="border border-white p-2">
                <input type="text" placeholder="Relation with deceased" class="w-full border p-1 border-white input rounded">
            </td>
            <td class="border border-white p-2 text-center">
                <button type="button" class="remove-row-btn bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Remove</button>
            </td>
        `;
        
        tbody.appendChild(newRow);
        
        // Add event listeners for sub-heir row
        setupSubHeirRowEvents(newRow);
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
                const diedDetails = document.getElementById(`sub_died_details_${parentHeirId}_${subHeirId}`);
                if (this.value === 'died') {
                    diedDetails.classList.remove('hidden');
                } else {
                    diedDetails.classList.add('hidden');
                }
            });
        });

        // Add event listener for sub-sub-heirs button
        const addSubSubHeirsBtn = row.querySelector('.add-sub-sub-heirs-btn');
        if (addSubSubHeirsBtn) {
            addSubSubHeirsBtn.addEventListener('click', function() {
                const parentHeirId = this.dataset.parentHeirId;
                const subHeirId = this.dataset.subHeirId;
                addSubSubLegalHeirsForHeir(parentHeirId, subHeirId);
            });
        }
    }

    function addSubSubLegalHeirsForHeir(parentHeirId, subHeirId) {
        console.log('Adding sub-sub legal heirs for parent heir ID:', parentHeirId, 'sub heir ID:', subHeirId);
        const tbody = document.querySelector('#legal-heirs-table tbody');
        if (!tbody) return;
        
        // Create sub-sub-heir row
        const newRow = document.createElement('tr');
        newRow.className = 'sub-sub-heir-row';
        newRow.dataset.parentHeirId = parentHeirId;
        newRow.dataset.subHeirId = subHeirId;
        
        // Generate sub-sub-heir number (2A1, 2A2, etc.)
        const existingSubSubHeirs = tbody.querySelectorAll(`tr[data-parent-heir-id="${parentHeirId}"][data-sub-heir-id="${subHeirId}"]`);
        const subSubHeirNumber = existingSubSubHeirs.length + 1;
        const fullSubSubHeirNumber = `${parentHeirId}${subHeirId.toUpperCase()}${subSubHeirNumber}`;
        
        newRow.innerHTML = `
            <td class="border border-white p-2 text-center">${fullSubSubHeirNumber}</td>
            <td class="border border-white p-2">
                <div class="space-y-2">
                    <input type="text" placeholder="SUB-SUB LEGAL HEIR FULL NAME" class="w-full input border p-1 border-white rounded sub-sub-heir-name">
                    <div class="flex items-center gap-4 mt-2">
                        <label class="text-white text-sm">Alive or Died:</label>
                        <label class="text-white text-sm">
                            <input type="radio" name="sub_sub_alive_died_${parentHeirId}_${subHeirId}_${subSubHeirNumber}" value="alive" class="mr-1 sub-sub-alive-died-radio"> Alive
                        </label>
                        <label class="text-white text-sm">
                            <input type="radio" name="sub_sub_alive_died_${parentHeirId}_${subHeirId}_${subSubHeirNumber}" value="died" class="mr-1 sub-sub-alive-died-radio"> Died
                        </label>
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
                        <div class="mt-2">
                            <label class="text-white text-sm">Died on:</label>
                            <input type="date" class="border p-1 border-white rounded ml-2 sub-sub-died-date">
                        </div>
                    </div>
                </div>
            </td>
            <td class="border border-white p-2">
                <input type="number" placeholder="Age of Sub-Sub Legal Heir" class="w-full border p-1 border-white input rounded">
            </td>
            <td class="border border-white p-2">
                <input type="text" placeholder="Relation with deceased" class="w-full border p-1 border-white input rounded">
            </td>
            <td class="border border-white p-2 text-center">
                <button type="button" class="remove-row-btn bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Remove</button>
            </td>
        `;
        
        tbody.appendChild(newRow);
        
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
                const subSubHeirNumber = row.querySelector('td:first-child').textContent.replace(/[A-Z]/g, '').replace(/[a-z]/g, '');
                const diedDetails = document.getElementById(`sub_sub_died_details_${parentHeirId}_${subHeirId}_${subSubHeirNumber}`);
                if (this.value === 'died') {
                    diedDetails.classList.remove('hidden');
                } else {
                    diedDetails.classList.add('hidden');
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
                firstCell.textContent = index + 1;
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
        let subHeirCount = 0;
        let currentMainHeir = mainHeirCount;

        otherRows.forEach((row) => {
            const firstCell = row.querySelector('td:first-child');
            const currentText = firstCell.textContent.trim();
            
            // Check if this is a main heir (just a number) or sub-heir (number with letter)
            if (/^\d+$/.test(currentText)) {
                // This is a main heir
                mainHeirCount++;
                currentMainHeir = mainHeirCount;
                subHeirCount = 0;
                firstCell.textContent = mainHeirCount;
            } else if (currentText.includes('(') && currentText.includes(')')) {
                // This is a sub-heir
                subHeirCount++;
                firstCell.textContent = `${currentMainHeir}(${String.fromCharCode(96 + subHeirCount)})`;
            }
        });

        // Update the global counters
        legalHeirCounter = mainHeirCount;
        subHeirCounter = subHeirCount;
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

