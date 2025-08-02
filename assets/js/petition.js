
    const page_1 = document.getElementById('page1');
    const page_2 = document.getElementById('page2');
    const page_3 = document.getElementById('page3');
    const page_4 = document.getElementById('page4');
    async function getThePage() {
        const res = await fetch('./page1.html');
        const res1 = await fetch('./page2.html')
        const res2 = await fetch('./page3.html')
        const res3 = await fetch('./page4.html')
        
        const html = await res.text();
        const html1 = await res1.text();
        const html2 = await res2.text();
        const html3 = await res3.text();
        page_1.innerHTML = html;
        page_2.innerHTML = html1
        page_3.innerHTML = html2
        page_4.innerHTML = html3
        // ✅ Now that content is loaded, run your setup logic
        setupPage1Events();
        setupPage2Events();

    }

    getThePage();

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

        // Place of death modal logic
        const des_button = document.getElementById('address_des_button');
        if (des_button) {
            des_button.addEventListener('click', function (e) {
                e.preventDefault();
                const death_first_question = document.getElementById('death_first_question');
                const death_second_question = document.getElementById('death_second_question');
                death_first_question.classList.remove('hidden');

                const first_question_no_click = document.getElementById('first_question_no');
                first_question_no_click.addEventListener('click', function (e) {
                    e.preventDefault();
                    death_first_question.classList.add('hidden');
                    death_second_question.classList.remove('hidden');

                    const second_question_no_click = document.getElementById('second_question_no');
                    second_question_no_click.addEventListener('click', function (e) {
                        e.preventDefault();
                        const who_died_text = document.getElementById('who_died');
                        const enter_addressProof_box = document.getElementById('enter_addressProof');
                        death_second_question.classList.add('hidden');
                        des_button.classList.add('hidden');
                        who_died_text.classList.add('hidden');
                        enter_addressProof_box.classList.remove('hidden');
                    });
                });
            });
        }

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
            });

            function updatePetitionerNumbers() {
                const blocks = petitionerWrapper.querySelectorAll(".petitioner_block");
                blocks.forEach((block, index) => {
                    const numberSpan = block.querySelector(".petitioner_number");
                    if (numberSpan) numberSpan.textContent = `${index + 1}.`;

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
            }
        }
    }

    // Legal Heir functionality for page 2
    let legalHeirCounter = 2; // Starting from 2 since we already have 2 rows
    let subHeirCounter = 0; // Counter for sub-heirs

    function setupPage2Events() {
        const addMoreLegalHeirBtn = document.getElementById('add-more-legal-heir');
        const addSubLegalHeirBtn = document.getElementById('add-sub-legal-heir');
        const addSonBtn = document.getElementById('add-son-btn');

        if (addMoreLegalHeirBtn) {
            addMoreLegalHeirBtn.addEventListener('click', addMoreLegalHeir);
        }

        if (addSubLegalHeirBtn) {
            addSubLegalHeirBtn.addEventListener('click', addSubLegalHeir);
        }

        if (addSonBtn) {
            addSonBtn.addEventListener('click', addSon);
        }

        // Setup remove buttons for existing sons
        setupSonRemoveButtons();
    }

    function addMoreLegalHeir() {
        legalHeirCounter++;
        const tbody = document.querySelector('#legal-heirs-table tbody');
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td class="border border-black p-2 text-center">${legalHeirCounter}</td>
            <td class="border border-black p-2">
                <div class="space-y-2">
                    <input type="text" placeholder="Name of Legal Heir" class="w-full border input p-1 border-black rounded">
                    <input type="text" placeholder="Residing at" class="w-full border p-1 border-black input rounded">
                    <input type="text" placeholder="Address of Legal Heir" class="w-full border input p-1 border-black rounded">
                </div>
            </td>
            <td class="border border-black p-2">
                <input type="number" placeholder="Age of Legal Heir" class="w-full border p-1 border-black input rounded">
            </td>
            <td class="border border-black p-2">
                <input type="text" placeholder="Relation with deceased" class="w-full border p-1 border-black input rounded">
            </td>
            <td class="border border-black p-2 text-center">
                <button type="button" class="remove-row-btn bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Remove</button>
            </td>
        `;
        
        tbody.appendChild(newRow);
        subHeirCounter = 0; // Reset sub-heir counter when adding new main heir
        
        // Add event listener to the remove button
        const removeBtn = newRow.querySelector('.remove-row-btn');
        removeBtn.addEventListener('click', function() {
            newRow.remove();
            updateRowNumbers();
        });
    }

    function addSubLegalHeir() {
        subHeirCounter++;
        const tbody = document.querySelector('#legal-heirs-table tbody');
        const newRow = document.createElement('tr');
        
        // Get the current main heir number
        const currentMainHeir = legalHeirCounter;
        const subHeirNumber = `${currentMainHeir}(${String.fromCharCode(96 + subHeirCounter)})`; // a, b, c, etc.
        
        newRow.innerHTML = `
            <td class="border border-black p-2 text-center">${subHeirNumber}</td>
            <td class="border border-black p-2">
                <div class="space-y-2">
                    <input type="text" placeholder="Name of Sub Legal Heir" class="w-full input border p-1 border-black rounded">
                    <input type="text" placeholder="Residing at" class="w-full border p-1 border-black input rounded">
                    <input type="text" placeholder="Address of Sub Legal Heir" class="w-full border input p-1 border-black rounded">
                </div>
            </td>
            <td class="border border-black p-2">
                <input type="number" placeholder="Age of Sub Legal Heir" class="w-full border p-1 border-black input rounded">
            </td>
            <td class="border border-black p-2">
                <input type="text" placeholder="Relation with deceased" class="w-full border p-1 border-black input rounded">
            </td>
            <td class="border border-black p-2 text-center">
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

    function updateRowNumbers() {
        const tbody = document.querySelector('#legal-heirs-table tbody');
        const rows = tbody.querySelectorAll('tr');
        let mainHeirCount = 0;
        let subHeirCount = 0;
        let currentMainHeir = 0;

        rows.forEach((row, index) => {
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
        
        // Get next exhibit letter
        const exhibitLetter = String.fromCharCode(65 + sonCounter); // A=65, B=66, C=67, etc.
        
        newSonEntry.className = 'son-entry border border-gray-300 p-3 rounded mb-2';
        newSonEntry.innerHTML = `
            <div class="flex items-center gap-2 mb-2">
                <span class="son-number">${sonCounter})</span>
                Master <input type="text" placeholder="Enter Son's Name" class="border p-1 border-black input rounded w-48">
                who was born on <input type="date" class="border input p-1 border-black rounded">
                <button type="button" class="remove-son-btn input bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Remove</button>
            </div>
            <div class="flex items-center gap-2">
                Hereto annexed and marked as Exhibit – "<input type="text" placeholder="${exhibitLetter}" class="border p-1 input border-black rounded w-12">" is the true copy of birth certificate.
            </div>
        `;
        
        container.appendChild(newSonEntry);
        
        // Add event listener to the new remove button
        const removeBtn = newSonEntry.querySelector('.remove-son-btn');
        removeBtn.addEventListener('click', function() {
            newSonEntry.remove();
            updateSonNumbers();
        });
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

